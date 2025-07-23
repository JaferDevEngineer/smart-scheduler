import logo from './logo.svg';
import './App.css';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import DashBoard from './pages/DashBoard'; 
import Register from './pages/UserRegister';
import HomePage from './pages/HomePage';
import ProviderLogInPage from './pages/ProviderLogInPage';
import ProviderRegisterPage from './pages/ProviderRegisterPage';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/login" element={<LogInPage/>} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/provider/login" element={<ProviderLogInPage />} />
        <Route path="/provider/register" element={<ProviderRegisterPage />} />
        <Route path="/DashBoard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
