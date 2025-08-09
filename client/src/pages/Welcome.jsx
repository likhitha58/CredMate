import React from "react";
import '../styles/WelcomePage.css';
import logo from '../assets/logo.png';
import image from '../assets/welcomepgimg.png';
const WelcomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="p-3">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 align-items-center">
              <li>
                <img
                  src={logo}
                  alt="CredMate Logo"
                  className="nav-logo"
                />
              </li>
              <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#hero" className="nav-link px-2 text-white">About</a></li>
              <li><a href="#features" className="nav-link px-2 text-white">Features</a></li>
            </ul>

            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">Login</button>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section container col-xxl-8 px-4 py-5" id="hero">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 hero-img-wrapper">
            <img
              src={image}
              className="hero-img img-fluid"
              alt="Hero Banner"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3" style={{ fontSize: '80px' }}>
              <span style={{ color: 'white' }}>Cred</span>
              <span style={{ color: '#0d6efd' }}>Mate</span>
            </h1>

            <p className="lead">
              CredMate is an <strong>AI-powered platform</strong> that analyzes and compares loan options,
              evaluates your financial profile, and instantly tells you if you’re eligible —
              helping you choose the best loan with confidence.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
                style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
              >
                Get Started
              </button>
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-4"
                style={{ borderColor: "#fff", color: "#0d6efd" }}
              >
                Learn More
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="container my-5" id="features">
        <h2 className="text-center mb-4">Why Choose <span style={{color:'#0d6efd'}}>CredMate</span>?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <h4>Smart Loan Advice</h4>
            <p style={{color:'#ffffff9c'}}>ML-driven loan recommendations tailored to your credit profile.</p>
          </div>
          <div className="col-md-4">
            <h4>Clear Financial Overview</h4>
            <p style={{color:'#ffffff9c'}}>Track your EMI, credit score, and offers in a unified dashboard.</p>
          </div>
          <div className="col-md-4">
            <h4>Safe & Secure</h4>
            <p style={{color:'#ffffff9c'}}>Top-tier encryption to keep your financial data protected.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3" >
            <li className="nav-item"><a href="#hero" className="nav-link px-2 " style={{ color: 'white' }}>Home</a></li>
            <li className="nav-item"><a href="#features" className="nav-link px-2 " style={{ color: 'white' }}>Features</a></li>
            <li className="nav-item"><a href="#hero" className="nav-link px-2 " style={{ color: 'white' }}>About</a></li>
          </ul>
          <p className="text-center ">© 2025 CredMate</p>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;
