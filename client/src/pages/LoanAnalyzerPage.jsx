import React, { useState } from "react";
import "../styles/LoanAnalyzerPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LoanAnalyzer = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    tenure: "",
    loanType: "",
    age: "",
    employment: "",
    income: "",
    existingEmi: "",
    creditScore: ""
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call Hugging Face API here
    console.log("Sending data:", formData);
    setResult({
      status: "Eligible",
      reason: "Your credit score and income meet the requirements."
    });
  };

  return (
    <>
      <Navbar />
      <div className="loan-analyzer-page">
        
        {/* Left Column - Loan Form */}
        <div className="loan-form-section">
          <h2 className="page-title">Loan Eligibility Analyzer</h2>
          <p className="page-description">
            Enter your details below to check your loan eligibility instantly.
          </p>

          <form className="loan-form" onSubmit={handleSubmit}>
            <label>Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />

            <label>Tenure (in years)</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />

            <label>Loan Type</label>
            <select name="loanType" value={formData.loanType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Education Loan">Education Loan</option>
            </select>

            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label>Employment Type</label>
            <select name="employment" value={formData.employment} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-employed">Self-employed</option>
            </select>

            <label>Monthly Income</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />

            <label>Existing EMIs</label>
            <input
              type="number"
              name="existingEmi"
              value={formData.existingEmi}
              onChange={handleChange}
            />

            <label>Credit Score</label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              required
            />

            <button type="submit" className="analyze-btn">Analyze</button>
          </form>

          {result && (
            <div className="result-box">
              <h3>Result: {result.status}</h3>
              <p>{result.reason}</p>
            </div>
          )}
        </div>

        {/* Right Column - Offers */}
        <div className="loan-offers-section">
          <h3>Explore More Options</h3>
          <button
            className="offer-btn"
            onClick={() => navigate("/loan-offer-analyzer")}
          >
            Compare Loan Offers
          </button>
          <button
            className="offer-btn"
            onClick={() => navigate("/bank-comparator")}
          >
            View Bank Offers
          </button>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default LoanAnalyzer;
