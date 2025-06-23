package com.mrservice.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MrProfileResponse {
    private Long userId;
    private String fullName;
    private String contactNo;
    private String region;
    private String location;
    private String address;
    private String profileImageUrl;
    private LocalDate dob;
    private Gender gender;
    private LocalDateTime lastUpdated;
}
