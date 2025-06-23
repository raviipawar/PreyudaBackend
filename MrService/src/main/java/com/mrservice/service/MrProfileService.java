package com.mrservice.service;

import org.springframework.stereotype.Service;

import com.mrservice.entity.MrProfile;
import com.mrservice.entity.MrProfileResponse;
import com.mrservice.entity.MrProfileUpdateRequest;
import com.mrservice.repository.MrProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MrProfileService {

    private final MrProfileRepository mrProfileRepository;
    private final AuthServiceClient authServiceClient;

    public Long getUserIdFromUsername(String username) {
        return authServiceClient.getUserIdByUsername(username);
    }

    public MrProfileResponse getProfile(Long userId) {
        MrProfile profile = mrProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("MR profile not found"));
        return mapToResponse(profile);
    }

    public MrProfileResponse updateProfile(Long userId, MrProfileUpdateRequest request) {
        MrProfile profile = mrProfileRepository.findByUserId(userId)
                .orElse(new MrProfile()); // Create new if not exists

        profile.setUserId(userId);
        profile.setFullName(request.getFullName());
        profile.setContactNo(request.getContactNo());
        profile.setRegion(request.getRegion());
        profile.setLocation(request.getLocation());
        profile.setAddress(request.getAddress());
        profile.setProfileImageUrl(request.getProfileImageUrl());
        profile.setDob(request.getDob());
        profile.setGender(request.getGender());

        MrProfile updated = mrProfileRepository.save(profile);
        return mapToResponse(updated);
    }

    private MrProfileResponse mapToResponse(MrProfile entity) {
        return MrProfileResponse.builder()
                .userId(entity.getUserId())
                .fullName(entity.getFullName())
                .contactNo(entity.getContactNo())
                .region(entity.getRegion())
                .location(entity.getLocation())
                .address(entity.getAddress())
                .profileImageUrl(entity.getProfileImageUrl())
                .dob(entity.getDob())
                .gender(entity.getGender())
                .lastUpdated(entity.getLastUpdated())
                .build();
    }
    
    public void createEmptyProfile(Long userId) {
        if (mrProfileRepository.existsById(userId)) return;

        MrProfile profile = MrProfile.builder()
                .userId(userId)
                .build();

        mrProfileRepository.save(profile);
    }
}
