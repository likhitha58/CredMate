import React, { useState } from "react";
import "../styles/FAQ.css";
import logo from "../assets/logo.png";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does the Loan Eligibility Analyzer work?",
      answer:
        "Our analyzer uses AI to assess your eligibility based on your income, credit score, and financial history. It provides you with the most accurate loan recommendations."
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Yes! We use bank-grade encryption and never share your details with third parties without your consent."
    },
    {
      question: "Can I compare multiple bank offers?",
      answer:
        "Absolutely. Our Smart Bank Comparator lets you view multiple loan offers side-by-side."
    },
    {
      question: "Do you charge any fees?",
      answer:
        "No. Our platform is completely free to use for loan analysis and offer comparison."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
        <img src={logo} style={{height:'130px'}}></img>
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
