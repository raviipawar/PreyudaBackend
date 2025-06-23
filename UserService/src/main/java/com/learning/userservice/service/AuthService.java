package com.learning.userservice.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.learning.userservice.entities.ERole;
import com.learning.userservice.entities.JwtResponse;
import com.learning.userservice.entities.LoginRequest;
import com.learning.userservice.entities.Role;
import com.learning.userservice.entities.SignupRequest;
import com.learning.userservice.entities.Status;
import com.learning.userservice.entities.User;
import com.learning.userservice.jwt.JwtProvider;
import com.learning.userservice.repositories.RoleRepository;
import com.learning.userservice.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;
	private final AuthenticationManager authenticationManager;
	private final RefreshTokenService refreshTokenService;

	public void registerUser(SignupRequest signupRequest) {
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			throw new RuntimeException("Username already taken");
		}

		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			throw new RuntimeException("Email already taken");
		}

		User user = new User();
		user.setUsername(signupRequest.getUsername());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
		user.setContactNo(signupRequest.getContactNo());
		user.setRegion(signupRequest.getRegion());
		user.setLocation(signupRequest.getLocation());
		user.setDob(signupRequest.getDob());
		user.setGender(signupRequest.getGender());
		user.setImageUrl(signupRequest.getImageUrl());
		user.setIdProof(signupRequest.getIdProof());
		user.setStatus(Status.ACTIVE);
		user.setIsVerified(false);
		user.setEnabled(true);

		Set<Role> roles = new HashSet<>();
		for (String roleName : signupRequest.getRoles()) {
		    try {
		        ERole eRole = ERole.valueOf(roleName.toUpperCase()); // Normalize casing
		        Role role = roleRepository.findByName(eRole)
		            .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
		        roles.add(role);
		    } catch (IllegalArgumentException ex) {
		        throw new RuntimeException("Invalid role: " + roleName);
		    }
		}

		user.setRoles(roles);
		User savedUser = userRepository.save(user);

		// ✅ Auto-create MR profile if role is MR
		boolean isMR = roles.stream().anyMatch(r -> r.getName().equals(ERole.ROLE_MR));
		if (isMR) {
			initMrProfile(savedUser.getId());
		}
	}

	private void initMrProfile(Long userId) {
		String mrServiceUrl = "http://localhost:8083/api/mr/profile/init";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Map<String, Long> body = new HashMap<>();
		body.put("userId", userId);

		HttpEntity<Map<String, Long>> request = new HttpEntity<>(body, headers);

		try {
			restTemplate.postForEntity(mrServiceUrl, request, String.class);
			System.out.println("✅ MR profile initialized for userId=" + userId);
		} catch (Exception ex) {
			System.err.println("❌ Failed to init MR profile: " + ex.getMessage());
		}
	}

	public JwtResponse loginUser(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		User user = (User) authentication.getPrincipal();

		String jwt = jwtProvider.generateToken(authentication);
		String refreshToken = refreshTokenService.createRefreshToken(user.getId()).getToken();

		List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), roles, refreshToken);
	}
}
