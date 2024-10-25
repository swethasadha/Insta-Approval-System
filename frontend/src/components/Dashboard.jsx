import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [loans, setLoans] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null); 
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        const fetchLoansAndCustomerInfo = async () => {
            try {
                if (customerId) {
                    console.log(`Fetching loans for customer ID: ${customerId}`);
                    
                    
                    const loanResponse = await axios.get(`http://localhost:8081/api/loans/${customerId}`);
                    console.log(`Loans for customer ID ${customerId}:`, loanResponse.data);
                    setLoans(loanResponse.data);
                    const customerResponse = await axios.get(`http://localhost:7777/api/customers/${customerId}`); 
                    console.log(`Customer info for ID ${customerId}:`, customerResponse.data);
                    setCustomerInfo(customerResponse.data); 
                } else {
                    setErrorMessage("No customer ID found.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorMessage("Error fetching loans or customer info. Please try again.");
            }
        };

        fetchLoansAndCustomerInfo();
    }, [customerId]);

    const handleLogout = () => {
        localStorage.removeItem('customerId'); 
        setLoans([]); 
        setCustomerInfo(null); 
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Loan Dashboard</h1>
            <button onClick={handleLogout}>Logout</button> 
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            {customerInfo && (
                <div>
                    <h2>Welcome, {customerInfo.name}</h2>
                    <p>Email: {customerInfo.email}</p>
                    <p>CIBIL Score: {customerInfo.cibilScore}</p> 
                </div>
            )}
            
            {loans.length === 0 ? (
                <p>No loans found for this customer.</p>
            ) : (
                <ul>
                    {loans.map(loan => (
                        <li key={loan.loanId}>
                            Loan Type: {loan.loanType}, Amount: {loan.amount}, Status: {loan.status}
                        </li>
                    ))}
                </ul>
            )}
            <a href="/apply-loan">Apply for a Loan</a>
        </div>
    );
};

export default Dashboard;
