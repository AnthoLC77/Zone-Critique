package com.zonecritique.zonecritique.service;

import com.zonecritique.zonecritique.entity.User;
import com.zonecritique.zonecritique.exeption.EmailAlreadyExistsException;
import com.zonecritique.zonecritique.exeption.UsernameAlreadyExistsException;
import com.zonecritique.zonecritique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private static final String PASSWORD_PATTERN = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!*@#$%^&+=])(?=\\S+$).{3,}$";

    private boolean isValidPassword(String password) {
        return password.matches(PASSWORD_PATTERN);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Nom d'utilisateur déjà utilisé par un autre utilisateur");
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email deja enregistrer par un autre utilisateur");
        }
        if (!isValidPassword(user.getPassword())) {
            return ResponseEntity.badRequest().body("Le mot de passe doit contenir au moins 3 caractères, une majuscule, un chiffre et un caractère spécial (*, !, @, etc.).\" ");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }



    public User updateUser(Long id, User userUpdate) {
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));

        if (userUpdate.getUsername() != null && !userUpdate.getUsername().isEmpty()) {
            User existingUser = userRepository.findByUsername(userUpdate.getUsername());

            // Si existingUser est null, cela signifie qu'aucun utilisateur avec ce nom d'utilisateur n'existe
            if (existingUser != null && !existingUser.getId().equals(id)) {
                throw new UsernameAlreadyExistsException("Nom d'utilisateur déjà utilisé par un autre utilisateur");
            }
            user.setUsername(userUpdate.getUsername());
        }

        if (userUpdate.getName() != null && !userUpdate.getName().isEmpty()) {
            user.setName(userUpdate.getName());
        }

        if (userUpdate.getEmail() != null && !userUpdate.getEmail().isEmpty()) {
            Optional<User> existingUserOptional = userRepository.findByEmail(userUpdate.getEmail());
            if (existingUserOptional.isPresent()) {
                User existingUser = existingUserOptional.get();
                if(!existingUser.getId().equals(id)) {
                    throw new EmailAlreadyExistsException("Email deja enregistrer par un autre utilisateur");
                }
            }
            user.setEmail(userUpdate.getEmail());
        }

        return userRepository.save(user);
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        return null;
    }

    public boolean authenticate(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
