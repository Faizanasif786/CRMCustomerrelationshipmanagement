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
        <Link to="/RochdaleRoster">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
   
        <li>
          <Link to="/RochdaleRoster">Rochdale Roster</Link>
        </li>
       <li>
          <Link to="/RochdaleSceheduleRota">Rochdale Scehedule Rota</Link>
        </li>
        <li>
          <Link to="/Rochdalepayment">Rochdale Addtional Services</Link>
        </li>
        <li>
          <Link to="/RochdalePaymentSystem">Rochdale Payment System</Link>
        </li>
        <li>
          <Link to="/RochdaleInvioce">Rochdale Invioce</Link>
        </li>
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,RochdaleSite Manager <Link to="/RochdaleSignin">Log Out</Link>{" "}
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
