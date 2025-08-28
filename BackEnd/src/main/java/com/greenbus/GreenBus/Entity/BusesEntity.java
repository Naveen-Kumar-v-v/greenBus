package com.greenbus.GreenBus.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "buses")
public class BusesEntity {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String busName;
 
 private String busType;
 
 private Long capacity;

 private LocalDate travelDate;

 private String bookedSeats;
 
 private String busTime;
  
 private String travelDuration;
 
 private Long perSeatPrice;

 public String getBusTime() {
	return busTime;
}

 public void setBusTime(String busTime) {
	this.busTime = busTime;
 }

 public String getTravelDuration() {
	return travelDuration;
 }

 public void setTravelDuration(String travelDuration) {
	this.travelDuration = travelDuration;
 }

 public Long getPerSeatPrice() {
	return perSeatPrice;
 }

 public void setPerSeatPrice(Long perSeatPrice) {
	this.perSeatPrice = perSeatPrice;
 }

 public Long getId() {
	return id;
 }

 public void setId(Long id) {
	this.id = id;
 }

 public String getBusName() {
	return busName;
 }

 public void setBusName(String busName) {
	this.busName = busName;
 }

 public String getBusType() {
	return busType;
 }

 public void setBusType(String busType) {
	this.busType = busType;
 }

 public Long getCapacity() {
	return capacity;
 }

 public void setCapacity(Long capacity) {
	this.capacity = capacity;
 }

 public LocalDate getTravelDate() {
	return travelDate;
 }

 public void setTravelDate(LocalDate travelDate) {
	this.travelDate = travelDate;
 }

 public String getBookedSeats() {
	return bookedSeats;
 }

 public void setBookedSeats(String bookedSeats) {
	this.bookedSeats = bookedSeats;
 }

 public BusesEntity(Long id, String busName, String busType, Long capacity, LocalDate travelDate, String bookedSeats,
		String busTime, String travelDuration, Long perSeatPrice) {
	super();
	this.id = id;
	this.busName = busName;
	this.busType = busType;
	this.capacity = capacity;
	this.travelDate = travelDate;
	this.bookedSeats = bookedSeats;
	this.busTime = busTime;
	this.travelDuration = travelDuration;
	this.perSeatPrice = perSeatPrice;
 }

 public BusesEntity() {
	super();
	// TODO Auto-generated constructor stub
 }


 
 }

