package com.mrservice.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mr_profiles")
public class MrProfile {

    @Id
    private Long userId; // Matches ID from Auth Service

    private String fullName;

    private String contactNo;

    private String region;

    private String location;

    private String address;

    private String profileImageUrl;

    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDateTime lastUpdated;

    @PreUpdate
    public void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        this.lastUpdated = LocalDateTime.now();
    }
}
