import React from "react";
// Import NavLink from react-router-dom to create navigation links that can style themselves when active
import { NavLink } from "react-router-dom";

// Navbar component: displays navigation links for the app
const Navbar = () => {
  return (
    // Container div with flexbox styling for horizontal layout and spacing
    <div className="flex flex-row gap-4 p-3 place-content-between">
      {/* NavLink to the Home page (root path '/') */}
      <NavLink to="/" className="nav-icon">
        <span className="visually-hidden">Home</span>
        <i className="fas fa-home"></i>
      </NavLink>

      {/* NavLink to the View History page */}
      <NavLink to="/viewPlay" className="nav-icon">
        <span className="visually-hidden">View History</span>
        <i className="fas fa-history"></i>
      </NavLink>

      {/* <NavLink to='play'>Play </NavLink> */}

      {/* NavLink to the Exit page */}
      <NavLink to="/exit" className="nav-icon">
        <span className="visually-hidden">Exit</span>
        <i className="fas fa-sign-out-alt"></i>
      </NavLink>
    </div>
  );
};

export default Navbar;
