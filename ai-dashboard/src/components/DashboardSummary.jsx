import React from 'react';
import '../App.css';

const DashboardSummary = () => {
  return (
    <section className="dashboard-summary">
      <h1>Your Learning Path</h1>
      <p>Tailored resources to help you excel as a <span className="highlight">Manager in Life Sciences</span></p>

      <div className="summary-card">
        <h2>Ari's Dashboard</h2>
        <div className="summary-grid">
          <div>
            <p>Your AI Level</p>
            <span className="tag">Foundational</span>
          </div>
          <div>
            <p>Learning Progress</p>
            <p>0 items completed</p>
          </div>
          <div>
            <p>Your Badges</p>
            <p>3 items to go</p>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '0%' }} />
        </div>
        <p className="next-badge">Next badge: AI Explorer</p>
      </div>
    </section>
  );
};

export default DashboardSummary;