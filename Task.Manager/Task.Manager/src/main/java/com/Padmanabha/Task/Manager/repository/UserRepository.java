package com.Padmanabha.Task.Manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Padmanabha.Task.Manager.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}