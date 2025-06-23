package com.mrservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.mrservice.entity.AuthUserResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthServiceClient {

    private final RestTemplate restTemplate;

    @Value("${auth.service.url}")
    private String authServiceBaseUrl;

    public Long getUserIdByUsername(String username) {
    	String url = authServiceBaseUrl + "/api/auth/by-username/" + username;
        try {
            ResponseEntity<AuthUserResponse> response = restTemplate.getForEntity(url, AuthUserResponse.class);
            System.out.println("AuthService response: " + response);
            return response.getBody().getId();
        } catch (HttpClientErrorException ex) {
            System.err.println("AuthService error: " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString());
            throw ex;
        }
    }
}

