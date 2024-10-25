import React, { useState } from 'react';
import axios from 'axios';

const ApplyLoan = () => {
    const [amount, setAmount] = useState('');
    const [loanType, setLoanType] = useState('');
    const [status, setStatus] = useState('pending'); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleApplyLoan = async (e) => {
        e.preventDefault();
        const customerId = localStorage.getItem('customerId'); 
        const loanDetails = { amount: parseFloat(amount), loanType, status, customerId };

        try {
            await axios.post(`http://localhost:8081/api/loans/${customerId}`, loanDetails);
            alert('Loan application submitted successfully!');
            
            window.location.href = "/customer/dashboard";
        } catch (error) {
            setErrorMessage("Error applying for loan. Please try again.");
            console.error("Error applying for loan:", error);
        }
    };

    return (
        <div>
            <h1>Apply for a Loan</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleApplyLoan}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Loan Type"
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                    required
                />
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default ApplyLoan;
