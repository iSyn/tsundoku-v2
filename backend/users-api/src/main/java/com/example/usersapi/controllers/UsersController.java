package com.example.usersapi.controllers;

import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/")
    public Iterable<User> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/{user_id}")
    public User getUserById(@PathVariable Long user_id) {
        User selectedUser = usersRepository.findOne(user_id);
        return selectedUser;
    }

    @PostMapping("/")
    public void createNewUser(@RequestBody User user) {
        usersRepository.save(user);
    }


}
