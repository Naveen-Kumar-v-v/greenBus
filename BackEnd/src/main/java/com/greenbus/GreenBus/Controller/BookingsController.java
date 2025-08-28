package com.greenbus.GreenBus.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenbus.GreenBus.Entity.BookingsEntity;
import com.greenbus.GreenBus.Repository.BookingsRepo;

@RestController
@RequestMapping("api/bookings")
public class BookingsController {
	
	@Autowired
	private BookingsRepo bookingsRepo; 
	
	@PostMapping
	public List<BookingsEntity> postBookingsDetails(@RequestBody List<BookingsEntity> bookings) {
		return bookingsRepo.saveAll(bookings);
	}
	
	@GetMapping("/getbookings/{username:.+}")
	public List<BookingsEntity> getBookingsDetailsOfUser(@PathVariable String username) {
		return bookingsRepo.findByusername(username);
	}
	
	@PutMapping("/updateUsername/{username:.+}")
	public List<BookingsEntity> UpdateUserName(@PathVariable String username,@RequestBody BookingsEntity bookings) {
		List<BookingsEntity> bookingData = bookingsRepo.findByusername(username);
		
		for (BookingsEntity booking : bookingData) {
	        booking.setUsername(bookings.getUsername());
	    }

	    bookingsRepo.saveAll(bookingData);
	    return bookingsRepo.findByusername(bookings.getUsername());
	}
	
}
