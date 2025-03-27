package com.zonecritique.zonecritique.controller;

import com.zonecritique.zonecritique.configuration.JwtUtils;
import com.zonecritique.zonecritique.entity.User;
import com.zonecritique.zonecritique.repository.UserRepository;
import com.zonecritique.zonecritique.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()
        || user.getPassword() == null || user.getPassword().isEmpty()) {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", "Le nom de l'utilisateur et le mot de passe sont obligatoires");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            if (authentication.isAuthenticated()) {

                User authenticatedUser = userRepository.findByUsername(user.getUsername());

                Map<String, Object> authData = new HashMap<>();
                authData.put("token", jwtUtils.generateToken(authenticatedUser.getUsername()));
                authData.put("type", "Bearer");
                authData.put("id", authenticatedUser.getId());
                authData.put("username", authenticatedUser.getUsername());
                authData.put("name", authenticatedUser.getName());
                authData.put("email", authenticatedUser.getEmail());
                authData.put("role", authenticatedUser.getRole());
                authData.put("password", authenticatedUser.getPassword());
                return ResponseEntity.ok(authData);
            }

            Map<String, String> error = new HashMap<>();
            error.put("message", "Nom d'utilisateur ou mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nom d'utilisateur ou mot de passe incorrect");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }
}
