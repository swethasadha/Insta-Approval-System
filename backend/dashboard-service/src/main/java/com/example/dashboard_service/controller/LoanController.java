package com.example.dashboard_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard_service.model.Loan;
import com.example.dashboard_service.service.LoanService;

@RestController
@RequestMapping("/api/loans")
@Validated
@CrossOrigin(origins = "/**")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/{customerId}") 
    public ResponseEntity<Loan> addLoanToCustomer(@PathVariable Long customerId, @RequestBody Loan loan) {
        Loan createdLoan = loanService.addLoanToCustomer(customerId, loan);
        return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<Loan>> getLoansByCustomerId(@PathVariable Long customerId) {
        List<Loan> loans = loanService.getLoansByCustomerId(customerId);
        if (loans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans(); 
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }
    
    @PutMapping("/{loanId}/approve") 
    public ResponseEntity<String> approveLoan(@PathVariable Long loanId) {
        Loan loan = loanService.approveLoan(loanId); 
        if (loan != null) {
            return ResponseEntity.ok("Loan approved successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{loanId}/reject") 
    public ResponseEntity<String> rejectLoan(@PathVariable Long loanId) {
        Loan loan = loanService.rejectLoan(loanId); 
        if (loan != null) {
            return ResponseEntity.ok("Loan rejected successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
