import React from 'react';
import '../App.css';

const RecommendationSection = () => {
  return (
    <section className="recommendations">
      <h2>Personalized Learning Recommendations</h2>
      <div className="tabs">
        <button className="active">Courses</button>
        <button>YouTube Videos</button>
        <button>Podcasts</button>
        <button>Blogs</button>
      </div>

      <div className="recommendation-list">
        <div className="resource">
          <h4>Foundational AI for Healthcare Professionals</h4>
          <p>Introduces AI foundations in patient care, research & admin.</p>
          <label><input type="checkbox" /> Mark as completed</label>
        </div>

        <div className="resource">
          <h4>Data-Driven Decision Making for Managers</h4>
          <p>Teaches how to apply data collection, analysis & strategy.</p>
          <label><input type="checkbox" /> Mark as completed</label>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;