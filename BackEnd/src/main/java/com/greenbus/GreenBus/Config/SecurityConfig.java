package com.greenbus.GreenBus.Config;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.greenbus.GreenBus.Security.JwtFilter;
import com.greenbus.GreenBus.Services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(auth ->
		auth.requestMatchers(HttpMethod.POST,"/users").permitAll()
		.requestMatchers("/users").authenticated()
		.requestMatchers("/cities").permitAll()
		.requestMatchers("reg").permitAll()
		.requestMatchers("/auth/login").permitAll()
		.requestMatchers("/getuser").authenticated()
		.requestMatchers("/api/**").permitAll()
		.anyRequest().permitAll()
		)
		.csrf(csrf -> csrf.disable()).cors().and()
		.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
		;
		
		return http.build();
		
	}
	
	@Bean
	public UserDetailsService userDetailsService() {
		
//		UserDetails user = User.withUsername("naveen@gmail.com")
//				.password(passwordEncoder.encode("naveen@123")) 
//				.roles("USER").build();
//		
//		return new InMemoryUserDetailsManager(user);
		
		return new UserService();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService());
		authProvider.setPasswordEncoder(passWordEncoder());
		return authProvider;
	}

	@Bean
	public PasswordEncoder passWordEncoder() {
		return new BCryptPasswordEncoder(); 
	}
	
	@Bean
	public AuthenticationManager authenticationManager() {
		return new ProviderManager(List.of(authenticationProvider()));
	}
}










