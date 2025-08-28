package com.greenbus.GreenBus.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userBookings")
public class BookingsEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	private String fromCity ;
	private String toCity;
	private Long bookingTotalAmount;
	private String bookedSeats;
	private LocalDate bookedTravelDate;
	private String BookedBusName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFromCity() {
		return fromCity;
	}
	public void setFromCity(String fromCity) {
		this.fromCity = fromCity;
	}
	public String getToCity() {
		return toCity;
	}
	public void setToCity(String toCity) {
		this.toCity = toCity;
	}
	public Long getBookingTotalAmount() {
		return bookingTotalAmount;
	}
	public void setBookingTotalAmount(Long bookingTotalAmount) {
		this.bookingTotalAmount = bookingTotalAmount;
	}
	public String getBookedSeats() {
		return bookedSeats;
	}
	public void setBookedSeats(String bookedSeats) {
		this.bookedSeats = bookedSeats;
	}
	public LocalDate getBookedTravelDate() {
		return bookedTravelDate;
	}
	public void setBookedTravelDate(LocalDate bookedTravelDate) {
		this.bookedTravelDate = bookedTravelDate;
	}
	public String getBookedBusName() {
		return BookedBusName;
	}
	public void setBookedBusName(String bookedBusName) {
		BookedBusName = bookedBusName;
	}
	public BookingsEntity(Long id, String username, String fromCity, String toCity, Long bookingTotalAmount,
			String bookedSeats, LocalDate bookedTravelDate, String bookedBusName) {
		super();
		this.id = id;
		this.username = username;
		this.fromCity = fromCity;
		this.toCity = toCity;
		this.bookingTotalAmount = bookingTotalAmount;
		this.bookedSeats = bookedSeats;
		this.bookedTravelDate = bookedTravelDate;
		BookedBusName = bookedBusName;
	}
	public BookingsEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
