package com.adminservice.entity;

import java.time.LocalDate;

import com.learning.userservice.entities.Gender;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String contactNo;
    private String region;
    private String location;
    private LocalDate dob;
    private Gender gender;
    private String imageUrl;
    private String idProof;
}
