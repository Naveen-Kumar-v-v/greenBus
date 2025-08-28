package com.greenbus.GreenBus.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenbus.GreenBus.Services.PaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("api/payments")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/create-order")
	public String createOrder(@RequestParam int amount,@RequestParam String currency ) throws RazorpayException {
		return paymentService.createOrder(amount, currency, "recieptent_5050");
	}
	
	@PostMapping("/verify")
	public ResponseEntity<Map<String,Object>> verifyPayment(@RequestBody Map<String, String> data) {
		return paymentService.verifyPayment(data);
	}
}
