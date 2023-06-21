package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.List;

@Service
public interface RoleService {
    List<Role> getAllRoles();
    void addRole (Role role);
    Role findRoleById(Long id);
}
