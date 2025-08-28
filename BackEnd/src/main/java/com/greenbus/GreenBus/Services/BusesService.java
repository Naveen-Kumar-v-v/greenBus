package com.greenbus.GreenBus.Services;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenbus.GreenBus.Entity.BusesEntity;
import com.greenbus.GreenBus.Repository.BusesRepo;

@Service
public class BusesService {


		
	    private final BusesRepo busRepository;
	    
	  
	    
	    public BusesService(BusesRepo busRepository) {
	        this.busRepository = busRepository;
	    }

	    @Transactional
	    public List<BusesEntity> getOrCreateBusesByDate(LocalDate date) {
	        List<BusesEntity> buses = busRepository.findByTravelDate(date);

	        if (buses.isEmpty()) {
	      
	        	List<BusesEntity> busesE = List.of(
	    		    new BusesEntity(null,"Express nova","AC Sleeper" ,45L, date,"","08:00 - 12:50","4h 50m",1349L),
	    		    new BusesEntity(null,"City Liner","AC Sleeper cum seater" ,55L, date,"","10:00 - 14:30","4h 30m",1290L),
	    		    new BusesEntity(null,"Smart intercity Exp","AC Seater" ,40L, date,"","12:00 - 17:10","5h 10m",790L),
	    		    new BusesEntity(null,"Streamline travels","Non AC Seater" ,40L, date,"","14:30 - 19:30","5h 0m",540L),
	    		    new BusesEntity(null,"NK travels","Non AC Seater" ,40L, date,"","16:30 - 23:30","5h 0m",490L)
    			);
	        	
	        	busRepository.saveAll(busesE);
	         
	            buses = busRepository.findByTravelDate(date);
	        }
	        
	        return buses;
	    }
	}

