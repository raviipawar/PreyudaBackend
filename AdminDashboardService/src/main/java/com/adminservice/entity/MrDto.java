package com.adminservice.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MrDto {
	private Long userId;
    private String fullName;
    private String contactNo;
    private String username;
    private String email;
    private String password;
    private List<String> roles;
    private String region;
    private String location;
    private String address;
    private String profileImageUrl;
    private LocalDate dob;
    private String gender;
    private LocalDateTime lastUpdated;
}
