import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
import ApplyLoan from './components/ApplyLoan';
import AdminApproval from './components/AdminApproval';
import './register.css';
import './login.css';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<h1>Welcome</h1>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/customer/dashboard" element={<Dashboard />} /> 
                    <Route path="/apply-loan" element={<ApplyLoan />} />
                    <Route path="/admin/approval" element={<AdminApproval />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
