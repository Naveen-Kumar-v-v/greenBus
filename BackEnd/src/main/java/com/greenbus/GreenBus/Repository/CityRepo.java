package com.greenbus.GreenBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenbus.GreenBus.Entity.CityEntity;

public interface CityRepo extends JpaRepository<CityEntity, Long> {

}
