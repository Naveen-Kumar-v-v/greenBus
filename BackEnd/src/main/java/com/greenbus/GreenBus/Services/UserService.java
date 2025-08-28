package com.greenbus.GreenBus.Services;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.greenbus.GreenBus.Entity.UserEntity;
import com.greenbus.GreenBus.Repository.UserRepo;

@Component
public class UserService implements UserDetailsService{

	@Autowired
	private UserRepo userrepo; 
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserEntity user = userrepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		return new User(user.getUsername(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("User")));
	}
	
	
}
