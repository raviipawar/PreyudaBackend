package com.learning.userservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
    DELETED
}
