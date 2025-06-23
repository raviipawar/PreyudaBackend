package com.adminservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminservice.entity.UserDto;
import com.adminservice.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    //to get all the mrs from usersr
    @GetMapping("/mrs")
    public ResponseEntity<List<UserDto>> getAllMRs() {
        List<UserDto> mrs = adminService.fetchAllMRs();
        return ResponseEntity.ok(mrs);
    }
}
