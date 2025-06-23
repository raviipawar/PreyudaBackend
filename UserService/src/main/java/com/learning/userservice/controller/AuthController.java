package com.learning.userservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.userservice.entities.JwtResponse;
import com.learning.userservice.entities.LoginRequest;
import com.learning.userservice.entities.RefreshTokenRequest;
import com.learning.userservice.entities.SignupRequest;
import com.learning.userservice.entities.User;
import com.learning.userservice.entities.UserBasicInfoResponse;
import com.learning.userservice.jwt.JwtProvider;
import com.learning.userservice.repositories.UserRepository;
import com.learning.userservice.service.AuthService;
import com.learning.userservice.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final RefreshTokenService refreshTokenService;
	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
		authService.registerUser(signupRequest);
		return ResponseEntity.ok("User registered successfully!");
	}

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> loginUser(@RequestBody LoginRequest loginRequest) {
		JwtResponse jwtResponse = authService.loginUser(loginRequest);
		return ResponseEntity.ok(jwtResponse);
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
		return refreshTokenService.findByToken(request.getRefreshToken()).map(refreshTokenService::verifyExpiration)
				.map(refreshToken -> {
					User user = refreshToken.getUser();
					String newAccessToken = jwtProvider.generateTokenFromUsername(user.getUsername());

					List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).toList();

					// Return both new access token and same refresh token
					JwtResponse jwtResponse = new JwtResponse(newAccessToken, user.getId(), user.getUsername(),
							user.getEmail(), roles, refreshToken.getToken() // Return same valid refresh token
					);

					return ResponseEntity.ok(jwtResponse);
				}).orElseThrow(() -> new RuntimeException("Refresh token not found or expired"));
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(@RequestBody RefreshTokenRequest request) {
		refreshTokenService.findByToken(request.getRefreshToken())
				.ifPresent(token -> refreshTokenService.deleteByUserId(token.getUser().getId()));
		return ResponseEntity.ok("Log out successful!");
	}

	@GetMapping("/byusername/{username}")
	public ResponseEntity<UserBasicInfoResponse> getUserByUsername(@PathVariable String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("User not found: " + username));

		UserBasicInfoResponse response = new UserBasicInfoResponse(user.getId(), user.getUsername(), user.getEmail());

		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		return userRepository.findById(id).map(user -> {
			userRepository.delete(user);
			return ResponseEntity.ok("User deleted successfully with ID: " + id);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + id));
	}
}
