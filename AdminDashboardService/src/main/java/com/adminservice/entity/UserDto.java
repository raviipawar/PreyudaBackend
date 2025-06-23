package com.adminservice.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.learning.userservice.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String contactNo;
    private String region;
    private String location;
    private LocalDate dob;
    private Gender gender;
    private String imageUrl;
    private String idProof;
    private String status;
    private Boolean isVerified;
    private Boolean enabled;
    private LocalDateTime lastLoginAt;
}
