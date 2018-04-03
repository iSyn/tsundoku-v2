package com.example.booksapi.controllers;

import com.example.booksapi.models.Book;
import com.example.booksapi.repositories.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class BooksController {

    @Autowired
    BooksRepository booksRepository;

    @GetMapping("/")
    public Iterable<Book> getAllUsers() {
        return booksRepository.findAll();
    }

    @GetMapping("/{book_id}")
    public Book getBookById(@PathVariable Long book_id) {
        Book selectedBook = booksRepository.findOne(book_id);
        return selectedBook;
    }

    @PostMapping("/")
    public void saveBook(@RequestBody Book book) {
        booksRepository.save(book);
    }

    @DeleteMapping("/{book_id}")
    public HttpStatus deleteBookById(@PathVariable Long book_id) throws Exception {
        Book selectedBook = booksRepository.findOne(book_id);
        booksRepository.delete(selectedBook);
        return HttpStatus.OK;
    }
}
