package com.learning.userservice.entities;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String contactNo;
    private String region;
    private String location;
    private LocalDate dob;
    private Gender gender;
    private String imageUrl;
    private String idProof;
}
