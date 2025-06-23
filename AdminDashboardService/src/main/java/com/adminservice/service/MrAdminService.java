package com.adminservice.service;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.adminservice.entity.MrDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MrAdminService {

    private final RestTemplate restTemplate;
    
    private final String MR_SERVICE_URL ="http://localhost:8083/api/mr/profile/all";

    public List<MrDto> getAllMRs() {
    	try {
            ResponseEntity<MrDto[]> response = restTemplate.getForEntity(
                    MR_SERVICE_URL, MrDto[].class);

            MrDto[] mrArray = response.getBody();
            if (mrArray == null || mrArray.length == 0) {
                System.out.println("MR Service returned empty or null list");
                return Collections.emptyList();
            }
            Arrays.stream(mrArray).forEach(mr -> System.out.println("MR Data: " + mr));

            return Arrays.asList(mrArray);
        } catch (Exception e) {
            System.err.println("Error fetching MR data: " + e.getMessage());
            return Collections.emptyList();
        }
    }
    public String addMR(MrDto mrDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MrDto> request = new HttpEntity<>(mrDto, headers);

        restTemplate.postForEntity("http://localhost:8082/api/auth/register", request, String.class);
        return "MR added successfully";
    }

    public String updateMR(Long id, MrDto mrDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MrDto> request = new HttpEntity<>(mrDto, headers);

        restTemplate.exchange("http://localhost:8082/api/auth/users/" + id, HttpMethod.PUT, request, String.class);
        return "MR updated successfully";
    }

    public String deleteMR(Long id) {
        restTemplate.delete("http://localhost:8082/api/auth/users/" + id);
        return "MR deleted successfully";
    }
}

