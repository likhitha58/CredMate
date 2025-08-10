import React from "react";
import "../styles/HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Your AI-Powered Loan Advisor</h1>
        <p>
          Analyze loan eligibility, compare banks, and get personalized
          financial advice with CredMate.
        </p>
        <button
          className="cta-btn"
          onClick={() => navigate("/loananalyzer")}
        >
          Check My Loan Eligibility
        </button>
      </section>

      {/* How It Works Section */}
      <div
        className="steps-container"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        {/* Row 1 */}
        <div className="steps-row">
          <div
            className="step-card"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">1</span>
            <p>Enter your gmail and signup</p>
          </div>
          <div
            className="step-card"
            onClick={() => navigate("/loananalyzer")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">2</span>
            <p>Provide your loan information</p>
          </div>
          <div
            className="step-card"
            onClick={() => navigate("/loananalyzer")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">3</span>
            <p>Get your eligibility results</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="steps-row reverse-row">
          <div
            className="step-card"
            onClick={() => navigate("/documents-checklist")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">6</span>
            <p>Get your documents checklisted</p>
          </div>
          <div
            className="step-card"
            onClick={() => navigate("/negotiate-ai")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">5</span>
            <p>Work with our Negotiate AI</p>
          </div>
          <div
            className="step-card"
            onClick={() => navigate("/loan-offers")}
            style={{ cursor: "pointer" }}
          >
            <span className="step-number">4</span>
            <p>Explore and compare other loans and bank offers</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
