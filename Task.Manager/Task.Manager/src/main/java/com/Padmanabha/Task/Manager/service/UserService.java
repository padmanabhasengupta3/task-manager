package com.Padmanabha.Task.Manager.service;

import com.Padmanabha.Task.Manager.entity.User;
import com.Padmanabha.Task.Manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(User user) {

        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        return userRepo.save(user);
    }

    public User login(String email, String password) {

        User user = userRepo.findByEmail(email);

        if (user == null) return null;

        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }


        return null;
    }
    // ✅ FIX UserService.java (ADD THIS METHOD)



    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // ✅ FIX UserService.java (ADD THIS ALSO)

    public ResponseEntity<?> getUserById(Long id) {

        var user = userRepo.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}