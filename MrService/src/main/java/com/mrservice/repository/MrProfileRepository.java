package com.mrservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mrservice.entity.MrProfile;

@Repository
public interface MrProfileRepository extends JpaRepository<MrProfile, Long> {

    Optional<MrProfile> findByUserId(Long userId);
    int countAllBy();
    @Query("SELECT p.region, COUNT(p) FROM MrProfile p GROUP BY p.region")
    List<Object[]> countByRegion();

    @Query("SELECT p.gender, COUNT(p) FROM MrProfile p GROUP BY p.gender")
    List<Object[]> countByGender();

    @Query("SELECT p.location, COUNT(p) FROM MrProfile p GROUP BY p.location")
    List<Object[]> countByLocation();

}