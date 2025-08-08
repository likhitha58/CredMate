import React from "react";
import '../styles/WelcomePage.css';
import logo from '../assets/LOGO.png'; // Adjust the path as necessary
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

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
              <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
              <li><a href="#" className="nav-link px-2 text-white">About</a></li>
            </ul>
            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">Login</button>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <div className="col-lg-6">
      <img
        src={logo}
        alt="credmate"
        className="img-fluid rounded shadow hero-image"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '400px' }}
      />
    </div>
        <h1 className="display-4 fw-bold text-body-emphasis">Welcome to CredMate</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            CredMate empowers you to make smarter financial decisions with personalized loan insights, AI-powered guidance, and a sleek dashboard.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Learn More</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Why Choose CredMate?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <h5>Smart Loan Advice</h5>
            <p>ML-driven loan recommendations tailored to your credit profile.</p>
          </div>
          <div className="col-md-4">
            <h5>Clear Financial Overview</h5>
            <p>Track your EMI, credit score, and offers in a unified dashboard.</p>
          </div>
          <div className="col-md-4">
            <h5>Safe & Secure</h5>
            <p>Top-tier encryption to keep your financial data protected.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
          <p className="text-center text-body-secondary">© 2025 CredMate</p>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;
