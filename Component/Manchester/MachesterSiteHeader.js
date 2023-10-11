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
        <Link to="/MachesterRoster">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
 
      
        <li>
          <Link to="/MachesterRoster">Machester Roster</Link>
        </li>
       <li>
          <Link to="/MachesterSceheduleRota">Machester Scehedule Rota</Link>
        </li>
        <li>
          <Link to="/Machesterpayment">Machester Addtional Services</Link>
        </li>
        <li>
          <Link to="/MachesterPaymentSystem">Machester Payment System</Link>
        </li>
        <li>
          <Link to="/MachesterInvioce">Machester Invioce</Link>
        </li>
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,ManchesterSite Manager <Link to="/MachesterSignin">Log Out</Link>{" "}
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
