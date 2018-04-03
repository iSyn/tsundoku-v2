package com.example.booksapi.controllers;

import com.example.booksapi.models.Book;
import com.example.booksapi.repositories.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BooksController {

    @Autowired
    BooksRepository booksRepository;

    @GetMapping("/")
    public Iterable<Book> getAllUsers() {
        return booksRepository.findAll();
    }
}
