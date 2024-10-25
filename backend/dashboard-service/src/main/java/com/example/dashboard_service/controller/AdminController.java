package com.example.dashboard_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dashboard_service.model.Loan;
import com.example.dashboard_service.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") 
public class AdminController {

    @Autowired
    private LoanService loanService;


    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> getAllLoansForApproval() {
        List<Loan> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @PutMapping("/loans/{loanId}/approve")
    public ResponseEntity<String> approveLoan(@PathVariable Long loanId) {
        Loan loan = loanService.approveLoan(loanId);
        if (loan != null) {
            return ResponseEntity.ok("Loan approved successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   
    @PutMapping("/loans/{loanId}/reject")
    public ResponseEntity<String> rejectLoan(@PathVariable Long loanId) {
        Loan loan = loanService.rejectLoan(loanId);
        if (loan != null) {
            return ResponseEntity.ok("Loan rejected successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
