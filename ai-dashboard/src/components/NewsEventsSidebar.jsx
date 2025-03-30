import React from 'react';
import '../App.css';

const NewsEventsSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="news-section">
        <h3>📰 AI News in Life Sciences</h3>
        <ul>
          <li><input type="checkbox" /> FDA Announces New Guidelines for AI in Medical Devices</li>
          <li><input type="checkbox" /> New Study Shows AI Improving Diagnostic Accuracy by 40%</li>
          <li><input type="checkbox" /> Major Pharma Company Launches AI Research Division</li>
        </ul>
      </div>

      <div className="events-section">
        <h3>📅 AI Events in Your Region</h3>
        <div className="event">
          <p><strong>Women in AI & Life Sciences Conference</strong></p>
          <p>June 15–16, 2025, Chicago, IL</p>
        </div>
        <div className="event">
          <p><strong>AI for Healthcare Management Webinar</strong></p>
          <p>July 12, 2025, Chicago, IL</p>
        </div>
        <div className="event">
          <p><strong>Life Sciences Data Summit</strong></p>
          <p>August 8, 2025, Chicago, IL</p>
        </div>
      </div>
    </aside>
  );
};

export default NewsEventsSidebar;