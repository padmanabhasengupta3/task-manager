package com.Padmanabha.Task.Manager.controller;

import com.Padmanabha.Task.Manager.entity.User;
import com.Padmanabha.Task.Manager.security.JwtUtil;
import com.Padmanabha.Task.Manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.register(user));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existing = userService.login(user.getEmail(), user.getPassword());

        if (existing != null) {
            String token = jwtUtil.generateToken(existing.getEmail());

            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "email", existing.getEmail(),
                            "role", existing.getRole()
                    )
            );
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}