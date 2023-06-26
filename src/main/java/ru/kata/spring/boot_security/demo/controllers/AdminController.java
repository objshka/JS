package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("allUsers", userService.getAllUsers());
        User princ = userService.getUserByUsername(principal.getName());
        model.addAttribute("princ", princ);
        model.addAttribute("newUser", new User());
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "admin";
    }

    @GetMapping("/{id}")
    public String showUser(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "user";
    }

    @GetMapping("/addUser")
    public String addNewUser(Model model, @ModelAttribute("user") User user) {
        List<Role> roles = roleService.getAllRoles();
        model.addAttribute("rolesAdd", roles);
        return "create_new_user";
    }

    @PostMapping("/user-creation")
    public String addCreateNewUser(User user) {
        try {
            userService.saveUser(user);
        } catch (Exception er) {
            System.err.println("Пользователь с таким email уже существует!");
        }
        return "redirect:/admin";
    }

    @PatchMapping("/user-update")
    public String updateUser(User user) {
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            System.err.println("Пользователь с таким логином уже существует!");
        }
        return "redirect:/admin";
    }

    @GetMapping("/user-update/{id}")
    public String updateUserForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "admin";
    }

    @GetMapping("/delete/{id}")
    public String deleteUserForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "admin";
    }

    @DeleteMapping("/user-delete")
    public String deleteUser(Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
