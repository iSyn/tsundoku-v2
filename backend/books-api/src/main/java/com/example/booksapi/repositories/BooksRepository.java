package com.example.booksapi.repositories;

import com.example.booksapi.models.Book;
import org.springframework.data.repository.CrudRepository;

public interface BooksRepository extends CrudRepository<Book, Long>{

}
