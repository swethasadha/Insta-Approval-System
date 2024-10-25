package com.example.dashboard_service.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dashboard_service.model.Loan;
import com.example.dashboard_service.repository.LoanRepository;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getLoansByCustomerId(Long customerId) {
        List<Loan> loans = loanRepository.findByCustomerId(customerId);
        if (loans.isEmpty()) {
            System.out.println("No loans found for customerId: " + customerId);
        } else {
            System.out.println("Found loans for customerId: " + customerId + " - " + loans);
        }
        
        return loans;
    }
    
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan addLoanToCustomer(Long customerId, Loan loan) {
        loan.setCustomerId(customerId);
        return loanRepository.save(loan);
    }
    public Loan approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setIsApproved(true);
        loan.setStatus("approved");
        return loanRepository.save(loan); 
    }
    public List<Loan> getPendingLoans() {
        return loanRepository.findByStatus("pending");
    }


    public Loan rejectLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setIsApproved(false);
        loan.setStatus("rejected");
        return loanRepository.save(loan);
    }
}
