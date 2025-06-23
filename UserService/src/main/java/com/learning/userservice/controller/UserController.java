package com.learning.userservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.userservice.entities.UserDto;
import com.learning.userservice.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/mr/all")
    public ResponseEntity<List<UserDto>> getAllMRs() {
        List<UserDto> mrList = userService.getAllMRs();
        return ResponseEntity.ok(mrList);
    }
}
