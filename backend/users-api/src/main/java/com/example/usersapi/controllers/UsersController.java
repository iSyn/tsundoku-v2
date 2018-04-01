package com.example.usersapi.controllers;

import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;

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

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        Iterable<User> allUsers = getAllUsers();
        for (User u : allUsers) {
            if (u.getUsername().equals(username)) {
                return u;
            }
        }
        return null;
    }

    @PostMapping("/")
    public User createNewUser(@RequestBody User user) {

        Iterable<User> allUsers = getAllUsers();
        for (User u : allUsers) {
            if (user.getUsername().equals(u.getUsername())) {
                return null;
            }
        }
        usersRepository.save(user);
        return user;
    }

    @DeleteMapping("/{user_id}")
    public HttpStatus deleteUserById(@PathVariable Long user_id) throws Exception {
        User selectedUser = usersRepository.findOne(user_id);
        usersRepository.delete(selectedUser);
        return HttpStatus.OK;
    }

}
