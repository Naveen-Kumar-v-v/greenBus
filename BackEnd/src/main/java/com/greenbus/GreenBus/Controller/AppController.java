package com.greenbus.GreenBus.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenbus.GreenBus.Entity.CityEntity;
import com.greenbus.GreenBus.Entity.UserEntity;
import com.greenbus.GreenBus.Exceptions.ResourceNotFound;
import com.greenbus.GreenBus.Repository.CityRepo;
import com.greenbus.GreenBus.Repository.UserRepo;
import com.greenbus.GreenBus.Security.JwtUtil;

@CrossOrigin("*")
@RestController
@RequestMapping("/")
public class AppController {

	@Autowired
	private CityRepo cityrepo;

	@Autowired
	private UserRepo userrepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private PasswordEncoder passencoder;

	@GetMapping("/cities")
	public List<CityEntity> getallcities() {
		return cityrepo.findAll();
	}

	@GetMapping("/cities/{id}")
	public CityEntity getCityById(@PathVariable Long id) {
		return cityrepo.findById(id).orElseThrow(() -> new ResourceNotFound("City Not found with this id :" + id));
	}

	@PostMapping("/cities")
	public ResponseEntity<?> postAllCities(@RequestBody List<CityEntity> cities) {
		if (cityrepo.count() > 0) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Cities already exist, cannot insert again.");
		}
		List<CityEntity> savedCities = cityrepo.saveAll(cities);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedCities);
	}

	@PutMapping("cities/{id}")
	public CityEntity updateCity(@PathVariable Long id, @RequestBody CityEntity city) {
		CityEntity cityData = cityrepo.findById(id)
				.orElseThrow(() -> new ResourceNotFound("City Not found with this id :" + id));
		cityData.setName(city.getName());
		return cityrepo.save(cityData);
	}

	@GetMapping("users")
	public List<UserEntity> getAllUsers() {
		return userrepo.findAll();
	}

	@PostMapping("reg")
	public UserEntity regUser(@RequestBody UserEntity user) {
		user.setPassword(passencoder.encode(user.getPassword()));
		return userrepo.save(user);
	}

	@GetMapping("getuserdetailsByUsername/{username:.+}")
	public Optional<UserEntity> getUserDetailsByUsername(@PathVariable String username) {
		return userrepo.findByUsername(username);
	}

	@GetMapping("getuser")
	public String getTokenUsername(@RequestHeader("Authorization") String token) {
		token = token.substring(7);
		return jwtUtil.extractUsername(token);
	}

	@PutMapping("updateUser/{username:.+}")
	public UserEntity UpdateUserDetails(@PathVariable String username, @RequestBody UserEntity user) {
		UserEntity userData = userrepo.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("user not found"));
		userData.setFullname(user.getFullname() == null ? userData.getFullname() : user.getFullname());
		userData.setPhonenumber(user.getPhonenumber() == null ? userData.getPhonenumber() : user.getPhonenumber());
		userData.setUsername(user.getUsername() == null ? userData.getUsername() : user.getUsername());
		return userrepo.save(userData);
	}

	@PutMapping("/reset-password")
	public UserEntity resetPassword(@RequestBody UserEntity user) {
		UserEntity userData = userrepo.findByUsername(user.getUsername())
				.orElseThrow(() -> new RuntimeException("User not found"));
		userData.setPassword(passencoder.encode(user.getPassword()));
		return userrepo.save(userData);
	}

}
