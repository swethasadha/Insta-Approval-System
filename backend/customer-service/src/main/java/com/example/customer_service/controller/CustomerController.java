package com.example.customer_service.controller;


import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.customer_service.model.Customer;
import com.example.customer_service.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    

    @PostMapping("/register")
    public ResponseEntity<Customer> register(@RequestBody Customer customer) {
        System.out.println("Received isAdmin: " + customer.isAdmin());
        
        Customer registeredCustomer = customerService.registerCustomer(customer);
        return ResponseEntity.ok(registeredCustomer);
    }

    @PostMapping("/login")
    public ResponseEntity<Customer> login(@RequestBody Customer customer) {
        Optional<Customer> existingCustomer = customerService.findCustomerByEmail(customer.getEmail());
        if (existingCustomer.isPresent() && existingCustomer.get().getPassword().equals(customer.getPassword())) {
            Customer foundCustomer = existingCustomer.get();
            return ResponseEntity.ok(foundCustomer);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long customerId) {
        System.out.println("Received request for customer ID: " + customerId);
        Customer customer = customerService.findById(customerId);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            System.out.println("Customer not found for ID: " + customerId);
            return ResponseEntity.notFound().build();
        }
    }


}
