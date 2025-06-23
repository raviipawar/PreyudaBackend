package com.adminservice.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.adminservice.entity.UserDto;

@Service
public class AdminService {

    @Autowired
    private RestTemplate restTemplate;

    private final String USER_SERVICE_URL = "http://localhost:8082/api/users/mr/all";

    public List<UserDto> fetchAllMRs() {
        try {
            ResponseEntity<UserDto[]> response = restTemplate.getForEntity(USER_SERVICE_URL, UserDto[].class);
            UserDto[] mrArray = response.getBody();
            return mrArray != null ? Arrays.asList(mrArray) : Collections.emptyList();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch MRs from UserService: " + e.getMessage());
        }
    }
}
