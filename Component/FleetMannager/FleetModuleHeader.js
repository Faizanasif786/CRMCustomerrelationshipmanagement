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
        <Link to="/FleetData">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
     
        <li>
          <Link to="/AddToFleet">Add To Fleet </Link>
        </li>
   
        <li>
          <Link to="/FleetData">Fleet Data</Link>
        </li>
     
     
       
        
      </ul>
      <ul className="UserLogin">
        <li>
          Hi,Fleet Manager <Link to="/FleetManngerSignin">Log Out</Link>{" "}
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
