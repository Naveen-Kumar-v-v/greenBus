# greenBus – Bus Booking System
greenBus is a full-stack bus booking platform that enables users to search buses, check seat availability, book tickets, and make secure payments via Razorpay. It includes user authentication (login/register), profile management, and booking history to view past reservations. Built using Spring Boot (backend), React (frontend), and MySQL (database).
## Live Demo link (Frontend)
[greenBus](https://greenbuss.netlify.app/)

## Backend APIs (AWS)
`http://34.225.208.106:3030` [API](#backend-apis)

## Features
### User Management
- *User Registration & Login*
- *Profile Update* (name, email, password)
- *Password Reset*
- *View Past Bookings*

### Bus Booking
- *Search Buses* by source, destination, and date
- *View Available Seats* in each bus
- *Book Seats* online
- *Secure Payment Integration* using *Razorpay*

### Others
- Responsive UI built with React
- Backend APIs with Spring Boot
- MySQL database for storing user, booking, and bus data

## Technologies Used
- *Frontend:* React, React Router, React Hooks, CSS
- *Backend:* Spring Boot, Spring Security, REST APIs, JAVA
- *Database:* MySQL
- *Payment Gateway:* Razorpay
- *Tools:* Postman, Git/GitHub, Eclipse IDE, MySQL Workbench, VS code

## Backend APIs 
AWS server (http://34.225.208.106:3030)
### User APIs

| Method | Endpoint          | Description             | Request Body | Authorization | Response |
|--------|-----------------|------------------------|-------------|-------|----------------|
| POST   | /auth/login      | Login a user           | `{ "username": naveen@gmail.com", "password": 123456" }` | `None` | `{ "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZlZW5AZ21haWwuY29tIiwiaWF0IjoxNzU2NzI3NzcyLCJleHAiOjE3NTY3MzQ5NzJ9.1-D6X2VKizu7l5MQn8RRlstly7I6bShYbBTvKP0ioGA" }` |
| POST   | /reg   | Register a new user    | `{"username": "naveen@gmail.com","password": "123456","fullname": "Naveenkumar","phonenumber": 8300602615}` | `None` | `{"userID": 1, "fullname": "Naveenkumar", "phonenumber": 8300602615, "username": "naveen1@gmail.com", "password": "$2a$10$rVnWkKCrrtCl3Q5Z9NDine6BNV0kZBOgSd3N2wgD43Vt/GSw2GtZW"}` |
| GET    | /getuser      | Get user by Token         | `None`        | `Bearer token(from login response)` | `naveen@gmail.com` |
| PUT | /reset-password | Reset password | `{"username": "naveen@gmail.com","password":"new_password"}` | `None` | `User details` |
| PUT | updateUser/{username} | Update user profile | `{"username": "naveen@gmail.com","fullname": "Naveenkumar","phonenumber": 8300602615}` | `None` | `User details` |
| GET | api/bookings/getbookings/{username} | get past bookings of user | `None` | `None` | `Bookings list`

### Bus APIs

| Method | Endpoint          | Description             | Request Body | Response |
|--------|-----------------|------------------------|-------------|---------|
| GET    | /buses/{date}    | Get all buses(yyyy-mm-dd)           | None        | `[  {"id": 1,"busName": "Express nova","busType": "AC Sleeper","capacity": 45,"travelDate": "2025-08-12","bookedSeats": "","busTime": "08:00 - 12:50","travelDuration": "4h 50m","perSeatPrice": 1349} ]` |
| PUT   | /buses/book{bus_id}           | update booked seats             | `{ "bookedSeats": "A1,A2" }` | `Bus details` |

### Payment APIs
| Method | Endpoint          | Description             | Request Body | Response |
|--------|-----------------|------------------------|-------------|---------|
| POST | api/payments/create-order?amount=100&currency=INR | create payment order (need Param (amount,currency)) | `None` | `{"amount": 10000,"amount_paid": 0,"notes": [],"created_at": 1756731677,"amount_due": 10000,"currency": "INR","receipt": "recieptent_5050","id": "order_RCLXXbvkKDtAQk","entity": "order","offer_id": null,"attempts": 0,"status": "created"}`
| POST | api/payments/verify | Verify payment | `{razorpay_payment_id: response.razorpay_payment_id,razorpay_order_id: response.razorpay_order_id,razorpay_signature: response.razorpay_signature,}` | `Status` |


## greenBus Project Screenshots 
<img src="/FrontEnd/GreenBusWebApp/images/greenBus_Home.png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (1).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (2).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (3).png" alt="App Screenshot" width="49%"/>
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (4).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (5).png" alt="App Screenshot" width="49%"/>
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (6).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (7).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (8).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (9).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (10).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (11).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (12).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (13).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (14).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (15).png" alt="App Screenshot" width="49%"/> 
<img src="FrontEnd/GreenBusWebApp/images/Screenshots/10.137.163.137_5050_ (16).png" alt="App Screenshot" width="49%"/>


