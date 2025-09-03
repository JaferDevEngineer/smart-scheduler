import React from 'react';
import '../../src/pageStyles/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <header className="hero">
        <h1>Welcome to QuickBook</h1>
        <p>Your one-stop platform for effortless booking and service management.</p>
      </header>

      <section className="feature-section">
        <div className="panel user-panel">
          <h2>For Users</h2>
          <div className="features">
            <div className="feature-card">🔍 Browse providers</div>
            <div className="feature-card">📅 Instant booking</div>
            <div className="feature-card">🔔 Get reminders</div>
            <div className="feature-card">📜 View history</div>
            <div className="feature-card">🔁 Reschedule/cancel</div>
          </div>
          <button className="cta-btn" onClick={() => navigate('/user/login')}>Login as User</button>
        </div>

        <div className="panel provider-panel">
          <h2>For Providers</h2>
          <div className="features">
            <div className="feature-card">📝 Manage profile</div>
            <div className="feature-card">📆 Set availability</div>
            <div className="feature-card">🚀 Instant alerts</div>
            <div className="feature-card">📈 Organize schedule</div>
            <div className="feature-card">👥 Manage customers</div>
          </div>
          <button className="cta-btn" onClick={() => navigate('/provider/login')}>Login as Provider</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
