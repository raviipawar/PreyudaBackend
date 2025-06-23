package com.mrservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MrServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MrServiceApplication.class, args);
	}
}
