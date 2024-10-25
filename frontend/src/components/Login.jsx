import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = { email, password };

        try {
            const response = await axios.post('http://localhost:7777/api/customers/login', payload);

            if (response.status === 200) {
                const { isAdmin, id } = response.data; 
                
                console.log("Login response:", response.data);

                
                localStorage.setItem('customerId', id);

                if (isAdmin) {
                    navigate("/admin/approval");
                } else {
                    navigate("/customer/dashboard");
                }
            } else {
                alert("Unexpected response structure: " + JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Login failed", error.response ? error.response.data : error);
            alert("Login failed: " + (error.response ? error.response.data : "Unknown error"));
        }
    };

    return (
        <div>
            <h1>Insta Loan Approval System</h1>
            <div className="container">
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
