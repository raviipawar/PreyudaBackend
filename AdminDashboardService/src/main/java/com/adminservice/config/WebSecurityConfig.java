package com.adminservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html")
								.permitAll().anyRequest().permitAll() // Allow all requests
				).formLogin(form -> form.disable()) // Disable form login
				.httpBasic(httpBasic -> httpBasic.disable()); // Disable HTTP Basic auth
		return http.build();
	}
}
