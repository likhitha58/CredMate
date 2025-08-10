import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#0d1b2a", // dark blue like navbar
    color: "#ffffff",
    padding: "15px 20px",
    textAlign: "center",
    borderTop: "2px solid #1b263b",
    position: "relative",
    bottom: "0",
    width: "100%",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const linkStyle = {
    color: "#00b4d8",
    marginLeft: "8px",
    marginRight: "8px",
    textDecoration: "none",
    fontWeight: "500",
  };

  const linkHoverStyle = {
    textDecoration: "underline",
  };

  return (
    <footer style={footerStyle}>
      <p>
        © {new Date().getFullYear()} CredMate. All rights reserved.
        <a
          href="/suuport"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Support
        </a>
        |
        <a
          href="/bankoffers"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Bank offers
        </a>
        |
        <a
          href="/comapareloans"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Compare offers
        </a>
      </p>
    </footer>
  );
};

export default Footer;
