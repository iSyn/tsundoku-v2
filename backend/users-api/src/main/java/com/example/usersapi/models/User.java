package com.example.usersapi.models;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data @Builder @Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "date_created")
    private Timestamp date_created;

    public User(String username, String password, Timestamp date_created) {
        this.username = username;
        this.password = password;
        this.date_created = date_created;
    }

}
