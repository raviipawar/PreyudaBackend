package com.learning.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.userservice.entities.ChangePasswordRequest;
import com.learning.userservice.entities.User;
import com.learning.userservice.entities.UserDto;
import com.learning.userservice.entities.UserUpdateRequest;
import com.learning.userservice.repositories.UserRepository;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. View Profile
    @GetMapping("/profile")
    public ResponseEntity<UserDto> viewProfile(Authentication authentication) {
    	String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(mapToDto(user));
    }

    // 2. Update Profile
    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(Authentication authentication,
                                                 @RequestBody UserUpdateRequest request) {
    	String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setContactNo(request.getContactNo());
        user.setRegion(request.getRegion());
        user.setLocation(request.getLocation());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setImageUrl(request.getImageUrl());
        user.setIdProof(request.getIdProof());

        userRepository.save(user);
        return ResponseEntity.ok(mapToDto(user));
    }

    // 3. Change Password
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(Authentication authentication,
                                                 @RequestBody ChangePasswordRequest request) {
    	String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }
    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setContactNo(user.getContactNo());
        dto.setRegion(user.getRegion());
        dto.setLocation(user.getLocation());
        dto.setDob(user.getDob());
        dto.setGender(user.getGender());
        dto.setImageUrl(user.getImageUrl());
        dto.setIdProof(user.getIdProof());
        return dto;
    }
    
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }

        return authentication.getName();
    }
}
