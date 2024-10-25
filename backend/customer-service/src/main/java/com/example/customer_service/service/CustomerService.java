package com.example.customer_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.customer_service.model.Customer;
import com.example.customer_service.repository.CustomerRepository;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer registerCustomer(Customer customer) {
    	 Customer registeredCustomer = customerRepository.save(customer); 
    	    
        return customerRepository.save(customer);
    }

    public Optional<Customer> findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }
    public Customer findById(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }
    private Integer generateRandomCibilScore() {
        return 300 + (int) (Math.random() * (900 - 300));
    }
    public Integer assignCibilScoreToCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        Integer cibilScore = generateRandomCibilScore();
        customer.setCibilScore(cibilScore);
        customerRepository.save(customer); 
        return cibilScore;
    }
   



}
