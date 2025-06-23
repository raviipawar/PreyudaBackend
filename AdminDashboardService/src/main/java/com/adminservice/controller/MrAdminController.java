package com.adminservice.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminservice.entity.MrDto;
import com.adminservice.service.MrAdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/mr")
@RequiredArgsConstructor
public class MrAdminController {

    private final MrAdminService mrAdminService;

    @PostMapping
    public ResponseEntity<String> addMR(@RequestBody MrDto mrDto) {
        return ResponseEntity.ok(mrAdminService.addMR(mrDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMR(@PathVariable Long id, @RequestBody MrDto mrDto) {
        return ResponseEntity.ok(mrAdminService.updateMR(id, mrDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMR(@PathVariable Long id) {
        return ResponseEntity.ok(mrAdminService.deleteMR(id));
    }
}
