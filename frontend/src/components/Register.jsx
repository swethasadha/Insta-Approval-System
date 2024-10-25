import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const isAdmin = role === 'admin'; 
        const payload = { name, email, password, isAdmin };

        console.log("Register Payload:", payload); 

        try {
            const response = await axios.post('http://localhost:7777/api/customers/register', payload);

            console.log("Register Response:", response.data); 

            if (response.status === 200) {
                const { id, isAdmin } = response.data;
                
                localStorage.setItem('customerId', id);

                if (isAdmin) {
                    window.location.href = "/admin/approval"; 
                } else {
                    window.location.href = "/customer/dashboard"; 
                }
            } else {
                setErrorMessage("Unexpected response from the server.");
            }
        } catch (error) {
            setErrorMessage("There was an error with the registration. Please try again.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <div>
            <h1>Insta Loan Approval System</h1>
            <div className="register-container">
                <h2 className="register-heading">Register</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
                
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>
                        Role:
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
