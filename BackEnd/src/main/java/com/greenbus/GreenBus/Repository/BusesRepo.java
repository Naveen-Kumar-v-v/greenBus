package com.greenbus.GreenBus.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenbus.GreenBus.Entity.BusesEntity;

public interface BusesRepo extends JpaRepository<BusesEntity, Long>{
	List<BusesEntity> findByTravelDate(LocalDate date);
}
