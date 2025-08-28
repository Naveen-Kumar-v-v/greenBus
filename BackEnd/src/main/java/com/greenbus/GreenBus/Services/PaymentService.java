package com.greenbus.GreenBus.Services;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
	
	
	@Value("${razorpay.api.key}")
	private String apiKey ;
	

	@Value("${razorpay.api.secret}")
	private String apiSecret ;
	
	
	public String createOrder(int amount , String currency, String receiptId) throws RazorpayException {
		RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount" ,amount * 100);
		orderRequest.put("currency" ,currency);
		orderRequest.put("receipt" ,receiptId);
		
		Order order = razorpayClient.orders.create(orderRequest);
		return order.toString();
				
	}
	
	public ResponseEntity<Map<String, Object>> verifyPayment(Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            String orderId = data.get("razorpay_order_id");
            String paymentId = data.get("razorpay_payment_id");
            String signature = data.get("razorpay_signature");

            String payload = orderId + "|" + paymentId;

            String expectedSignature = hmacSHA256(payload, apiSecret);

            if (expectedSignature.equals(signature)) {
                response.put("success", true);
                response.put("message", "Payment verified successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Invalid payment signature");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error verifying payment");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

	  private String hmacSHA256(String data, String secret) throws Exception {
	        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
	        SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
	        sha256_HMAC.init(secretKey);
	        byte[] hash = sha256_HMAC.doFinal(data.getBytes());

	        StringBuilder hexString = new StringBuilder();
	        for (byte b : hash) {
	            String hex = Integer.toHexString(0xff & b);
	            if (hex.length() == 1) hexString.append('0');
	            hexString.append(hex);
	        }
	        return hexString.toString();
	    }
}
