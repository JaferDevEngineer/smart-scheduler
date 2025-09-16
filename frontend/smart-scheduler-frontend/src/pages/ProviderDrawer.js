import React from "react";
import "../pageStyles/ProviderDrawer.css";

const ProviderDrawer = ({ provider, onClose }) => {
  if (!provider) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer"
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <button className="drawer-close" onClick={onClose}>
          ✕
        </button>
        <div className="drawer-header">
          <div className="drawer-avatar">
            {provider.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{provider.name}</h2>
            <p>{provider.profession?.name}</p>
            <p className="drawer-email">{provider.email}</p>
          </div>
        </div>
        <div className="drawer-body">
          <h3>About</h3>
          <p>{provider.description || "No description available."}</p>

          <h3>Next Availability</h3>
          <p>Tomorrow • 11:00 AM</p>

          <button className="book-btn">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDrawer;
