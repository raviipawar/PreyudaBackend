package com.learning.userservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.userservice.entities.User;
import com.learning.userservice.entities.UserDto;
import com.learning.userservice.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getAllMRs() {
        List<User> users = userRepository.findAllByRole("ROLE_MR");
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private UserDto convertToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getContactNo(),
                user.getRegion(),
                user.getLocation(),
                user.getDob(),
                user.getGender(),
                user.getImageUrl(),
                user.getIdProof(),
                user.getStatus(),
                user.getIsVerified(),
                user.getEnabled(),
                user.getLastLoginAt()
        );
    }
}
