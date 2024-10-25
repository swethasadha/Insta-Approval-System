import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApproval = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');
    const [showAllLoans, setShowAllLoans] = useState(false); 

    const cibilThresholds = {
        good: 450,  
        average: 350,
        bad: 200
    };

    const categorizeCibilScore = (cibilScore) => {
        if (cibilScore >= cibilThresholds.good) {
            return 'Good';
        } else if (cibilScore >= cibilThresholds.average) {
            return 'Average';
        } else {
            return 'Bad';
        }
    };

    const getCibilColor = (cibilScore) => {
        if (cibilScore >= cibilThresholds.good) {
            return { color: 'green' };  
        } else if (cibilScore >= cibilThresholds.average) {
            return { color: 'orange' }; 
        } else {
            return { color: 'red' };    
        }
    };

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/admin/loans'); 
                const allLoans = response.data; 

                const loansWithCibil = await Promise.all(allLoans.map(async loan => {
                    const customerResponse = await axios.get(`http://localhost:7777/api/customers/${loan.customerId}`); 
                    return { ...loan, cibilScore: customerResponse.data.cibilScore }; 
                }));

                const filteredLoans = showAllLoans 
                    ? loansWithCibil 
                    : loansWithCibil.filter(loan => loan.status === "pending"); 

                const sortedLoans = filteredLoans.sort((a, b) => a.loanId - b.loanId); 
                setLoans(sortedLoans);
            } catch (error) {
                console.error("Error fetching loans:", error);
                setError("Error fetching loans. Please try again.");
            }
        };

        fetchLoans();
    }, [showAllLoans]); 

    const handleApprove = async (loanId) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/admin/loans/${loanId}/approve`);
            if (response.status === 200) {
                alert(response.data); 
                setLoans(loans.filter(loan => loan.loanId !== loanId)); 
            }
        } catch (error) {
            console.error("Error approving loan:", error);
            alert("Failed to approve loan: " + (error.response?.data || error.message)); 
        }
    };

    const handleReject = async (loanId) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/admin/loans/${loanId}/reject`);
            if (response.status === 200) {
                alert(response.data);
                setLoans(loans.filter(loan => loan.loanId !== loanId));
            }
        } catch (error) {
            console.error("Error rejecting loan:", error);
            alert("Failed to reject loan: " + (error.response?.data || error.message)); 
        }
    };

    const toggleView = () => {
        setShowAllLoans(!showAllLoans); 
    };

    return (
        <div>
            <h1>Loan Approval Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <button onClick={toggleView}>
                {showAllLoans ? 'Show Pending Loans' : 'Show All Loans'}
            </button>

            {loans.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Loan ID</th>
                            <th>Customer ID</th>
                            <th>Amount</th>
                            <th>Loan Type</th>
                            <th>Status</th>
                            <th>CIBIL Score</th>
                            <th>Score Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map(loan => (
                            <tr key={loan.loanId}>
                                <td>{loan.loanId}</td>
                                <td>{loan.customerId}</td>
                                <td>{loan.amount}</td>
                                <td>{loan.loanType}</td>
                                <td>{loan.status}</td>
                                <td>{loan.cibilScore}</td>
                                <td style={getCibilColor(loan.cibilScore)}> 
                                    {categorizeCibilScore(loan.cibilScore)}
                                </td> 
                                <td>
                                    {loan.status === "pending" && (
                                        <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => handleApprove(loan.loanId)}>Approve</button>
                                            <button onClick={() => handleReject(loan.loanId)}>Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No loans to review.</p>
            )}
        </div>
    );
};

export default AdminApproval;
