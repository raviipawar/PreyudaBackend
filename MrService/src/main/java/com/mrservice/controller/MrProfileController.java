package com.mrservice.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrservice.config.JwtUtils;
import com.mrservice.entity.MrProfile;
import com.mrservice.entity.MrProfileInitRequest;
import com.mrservice.entity.MrProfileResponse;
import com.mrservice.entity.MrProfileUpdateRequest;
import com.mrservice.repository.MrProfileRepository;
import com.mrservice.service.MrProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/mr/profile")
@RequiredArgsConstructor
public class MrProfileController {

    private final MrProfileService mrProfileService;
    private final JwtUtils jwtUtils;
    private final MrProfileRepository mrProfileRepository;
    
    @GetMapping("/all")
    public ResponseEntity<List<MrProfile>> getAllMrProfiles() {
        List<MrProfile> profiles = mrProfileRepository.findAll();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping
    public ResponseEntity<MrProfileResponse> getMyProfile(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        String username = jwtUtils.getUsernameFromToken(token);
        Long userId = mrProfileService.getUserIdFromUsername(username);

        MrProfileResponse response = mrProfileService.getProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<MrProfileResponse> updateMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody MrProfileUpdateRequest updateRequest) {

        String token = extractToken(authHeader);
        String username = jwtUtils.getUsernameFromToken(token);
        Long userId = mrProfileService.getUserIdFromUsername(username);

        MrProfileResponse updated = mrProfileService.updateProfile(userId, updateRequest);
        return ResponseEntity.ok(updated);
    }

    private String extractToken(String header) {
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        throw new RuntimeException("Invalid Authorization header");
    }
    
    @PostMapping("/init")
    public ResponseEntity<String> createEmptyProfile(@RequestBody MrProfileInitRequest request) {
        mrProfileService.createEmptyProfile(request.getUserId());
        return ResponseEntity.ok("MR profile initialized.");
    }
    
    @GetMapping("/count")
    public ResponseEntity<Integer> countMRs() {
        int count = mrProfileRepository.countAllBy();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/count-by-region")
    public ResponseEntity<Map<String, Long>> countByRegion() {
        return ResponseEntity.ok(convertToMap(mrProfileRepository.countByRegion()));
    }

    @GetMapping("/count-by-gender")
    public ResponseEntity<Map<String, Long>> countByGender() {
        return ResponseEntity.ok(convertToMap(mrProfileRepository.countByGender()));
    }

    @GetMapping("/count-by-location")
    public ResponseEntity<Map<String, Long>> countByLocation() {
        return ResponseEntity.ok(convertToMap(mrProfileRepository.countByLocation()));
    }

    private Map<String, Long> convertToMap(List<Object[]> rawList) {
        return rawList.stream()
                .collect(Collectors.toMap(
                    row -> String.valueOf(row[0]),
                    row -> (Long) row[1]
                ));
    }
}

