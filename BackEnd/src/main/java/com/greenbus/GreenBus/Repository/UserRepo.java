package com.greenbus.GreenBus.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenbus.GreenBus.Entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByUsername(String username);
}
