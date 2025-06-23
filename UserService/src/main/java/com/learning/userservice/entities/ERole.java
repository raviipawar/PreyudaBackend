
package com.learning.userservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ERole {
    ROLE_ADMIN,
    ROLE_MR,
    ROLE_CHEMIST,
    ROLE_DOCTOR,
    ROLE_HOSPITAL
}