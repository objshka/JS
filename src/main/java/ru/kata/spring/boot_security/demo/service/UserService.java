package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

@Service
public interface UserService {
    User getUserById(Long userId);
    User getUserByUsername(String username);
    void saveOrUpdateUser(User user);
    void deleteUser(Long userId);
    List<User> getAllUsers();
}
