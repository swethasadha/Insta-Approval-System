package com.example.dashboard_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dashboard_service.model.Loan;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByCustomerId(Long customerId);
    List<Loan> findByStatus(String status);
}
