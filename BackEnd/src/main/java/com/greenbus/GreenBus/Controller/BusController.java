package com.greenbus.GreenBus.Controller;



import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenbus.GreenBus.Entity.BusesEntity;
import com.greenbus.GreenBus.Repository.BusesRepo;
import com.greenbus.GreenBus.Services.BusesService;

@RestController
@RequestMapping("/buses")
public class BusController {

 private final BusesService busService;

 @Autowired
 private BusesRepo busRepo;
 
 public BusController(BusesService busService) {
     this.busService = busService;
 }

 @GetMapping("/{date}")
 public List<BusesEntity> getBuses(@PathVariable String date) {
     LocalDate travelDate = LocalDate.parse(date);
     return busService.getOrCreateBusesByDate(travelDate);
 }
 @PutMapping("/book/{id}")
 public BusesEntity updateBookedseats(@PathVariable Long id,@RequestBody BusesEntity buses) {
	BusesEntity busesData = busRepo.findById(id).orElseThrow(() -> new RuntimeException("Bus not fount"));
	busesData.setBookedSeats(buses.getBookedSeats());
	return busRepo.save(busesData);
 }
}
