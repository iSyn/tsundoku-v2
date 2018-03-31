package com.example.usersapi.models;

import lombok.*;

import javax.persistence.*;

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

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
