package com.example.customer_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.customer_service.model.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
}
