import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/Home';
import LoanAnalyzer from './pages/LoanAnalyzerPage';
import FAQ from './components/FAQ';
// import OTPVerification from "./pages/OTPVerification.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/loananalyzer" element={
          <ProtectedRoute>
            <LoanAnalyzer />
          </ProtectedRoute>
        } />

        <Route path="/faqs" element={<FAQ />} />
        {/* <Route path="/verify-otp" element={<OTPVerification />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
