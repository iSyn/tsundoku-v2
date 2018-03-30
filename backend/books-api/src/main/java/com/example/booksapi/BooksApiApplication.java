package com.example.booksapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class BooksApiApplication {

	@RequestMapping("/")
	public String test() {
		return "Books api";
	}

	public static void main(String[] args) {
		SpringApplication.run(BooksApiApplication.class, args);
	}
}
