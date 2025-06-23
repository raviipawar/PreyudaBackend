package com.learning.userservice.entities;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
	private String username;
    private String email;
    private String password;
    @JsonProperty("roles")
    private Set<String> roles;
    private String contactNo;
    private String region;
    private String location;
    private LocalDate dob;
    private Gender gender;
    private String imageUrl;
    private String idProof;
}