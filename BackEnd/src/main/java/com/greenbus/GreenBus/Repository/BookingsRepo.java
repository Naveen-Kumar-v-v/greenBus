package com.greenbus.GreenBus.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenbus.GreenBus.Entity.BookingsEntity;

public interface BookingsRepo extends JpaRepository<BookingsEntity, Long>{
	List<BookingsEntity> findByusername(String username);
}
