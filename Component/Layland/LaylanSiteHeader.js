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
        <Link to="/LaylandRoster">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
    
        <li>
          <Link to="/LaylandRoster">Layland Roster</Link>
        </li>
       <li>
          <Link to="/LaylandSceheduleRota">Layland Scehedule Rota</Link>
        </li>
        <li>
          <Link to="/Laylandpayment">Layland Addtional Services</Link>
        </li>
        <li>
          <Link to="/LaylandPaymentSystem">Layland Payment System</Link>
        </li>
        <li>
          <Link to="/LaylandInvioce">Layland Invioce</Link>
        </li>
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,LaylandSite Manager <Link to="/LaylandSignin">Log Out</Link>{" "}
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
