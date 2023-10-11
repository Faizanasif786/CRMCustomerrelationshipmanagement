import React, { useState } from "react";
import "../Navbar.css"; // Import the CSS file for the styles
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className="navbar" id="Nav">
      <div className="navbar-logo">
        <Link to="/BoltonRoster">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
  
        <li>
          <Link to="/BoltonRoster">Bolton Roster</Link>
        </li>
       <li>
          <Link to="/BoltonSceheduleRota">Bolton Scehedule Rota</Link>
        </li>
        <li>
          <Link to="/Boltonpayment">Bolton Addtional Services</Link>
        </li>
        <li>
          <Link to="/BoltonPaymentSystem">Bolton Payment System</Link>
        </li>
        <li>
          <Link to="/BoltonInvioce">Bolton Invioce</Link>
        </li>
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,BoltonSite Manager <Link to="/BoltonSignin">Log Out</Link>{" "}
        </li>
      </ul>
      <div className="navbar-toggle" onClick={toggleLinks}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
