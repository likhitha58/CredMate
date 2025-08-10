import React from "react";
import "../styles/HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const HomePage = () => {
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
        <a href="#" className="cta-btn">Check My Loan Eligibility</a>
      </section>

      {/* Features Section */}
      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How CredMate Works</h2>
        <div className="flowchart" style={{color:'#0d1b2a'}}>
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up for free to access all features of CredMate.</p>
          </div>
          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Enter Loan Details</h3>
            <p>Provide your loan amount, tenure, and income details.</p>
          </div>
          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Analyze & Compare</h3>
            <p>Get AI-powered analysis and compare bank offers.</p>
          </div>
          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Negotiate & Apply</h3>
            <p>Use our negotiation assistant and apply with confidence.</p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
