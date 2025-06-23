package com.mrservice.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MrProfileUpdateRequest {
    private String fullName;
    private String contactNo;
    private String region;
    private String location;
    private String address;
    private String profileImageUrl;
    private LocalDate dob;
    private Gender gender;
}
