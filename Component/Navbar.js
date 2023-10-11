import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file for the styles
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  // function LogOut(){
  //   alert('LogOut Success')
  // }

  return (
    <nav className="navbar" id="Nav">
      <div className="navbar-logo">
        <Link to="/RealTimeData">RAINA</Link>
      </div>
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
      <li>
          <Link to="/RealTimeData">Profile Data</Link>
        </li>
      <li>
          <Link to="/profile">Add Driver</Link>
        </li>
        <li>
          <Link to="/Rochdale">Rota</Link>
        </li>
        
   <li>
    <Link to={'/SceheduleRota'}>SceheduleRota</Link>
   </li>
   <li>
    <Link to={'/Roster'}>Roster</Link>
   </li>
        <li>
          <Link to="/summary">Summary</Link>
        </li>
        <li>
          <Link to="/subsummary">Sub Summary</Link>
        </li>
        <li>
          <Link to="/payment">Addtional Services </Link>
        </li>
        <li>
          <Link to="/PaymentSystem">Payment System </Link>
        </li>
        <li>
          <Link to="/Invioce">Invioce </Link>
        </li>
        <li>
          <Link to="/profite-loss">Profite/loss </Link>
        </li>
        <li>
          <Link to="/driverdeduction">Driver Deduction</Link>
        </li>
       
        <li>
          <Link to="/addservices">Rate Card</Link>
        </li>
        <li>
          <Link to="/notification">Notification</Link>
        </li>
      </ul>
     
      <ul className="UserLogin">
        <li>
          Hi,Admin <Link to="/">Log Out</Link>{" "}
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
