package com.greenbus.GreenBus.Model;

import java.time.LocalDate;

public class Buses {
	private Long id;

	 private String busName;
	 
	 private String busType;
	 
	 private Long capacity;

	 private LocalDate travelDate;

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

	 public Buses(Long id, String busName, String busType, Long capacity, LocalDate travelDate) {
		super();
		this.id = id;
		this.busName = busName;
		this.busType = busType;
		this.capacity = capacity;
		this.travelDate = travelDate;
	 }

	 public Buses() {
		super();
		// TODO Auto-generated constructor stub
	 }
}
