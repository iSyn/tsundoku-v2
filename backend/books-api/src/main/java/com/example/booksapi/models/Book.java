package com.example.booksapi.models;

import lombok.*;

import javax.persistence.*;

@Data @NoArgsConstructor @AllArgsConstructor @Getter @Setter
@Entity @Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long book_id;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "read_status")
    private Integer read_status;

    @Column(name = "book_title")
    private String book_title;

    @Column(name = "book_author")
    private String book_author;

    @Column(name = "book_desc")
    private String book_desc;

    public Book(Integer user_id, Integer read_status, String book_title, String book_author, String book_desc) {
        this.user_id = user_id;
        this.read_status = read_status;
        this.book_title = book_title;
        this.book_author = book_author;
        this.book_desc = book_desc;
    }

}