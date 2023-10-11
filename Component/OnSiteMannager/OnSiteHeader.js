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
        <Link to="/OnSiteLayland">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
      <li>
          <Link to="/OnSiteLayland">Rota</Link>
        </li>
      
        <li>
          <Link to="/OnsiteRoster">Roster</Link>
        </li>
       <li>
          <Link to="/OnSiteSceheduleRota">Scehedule Rota</Link>
        </li>
        <li>
          <Link to="/Onsitepayment">Onsite Addtional Services</Link>
        </li>
        <li>
          <Link to="/OnsitePaymentSystem">Onsite Payment System</Link>
        </li>
        <li>
          <Link to="/OnSiteInvioce">Invioce</Link>
        </li>
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,OnSite Manager <Link to="/OnSiteSignin">Log Out</Link>{" "}
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
