import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardSummary from '../components/DashboardSummary';
import RecommendationSection from '../components/RecommendationSection';
import NewsEventsSidebar from '../components/NewsEventsSidebar';
import FloatingChatbot from '../components/FloatingChatbot';

import Footer from '../components/Footer';
import '../App.css';

const DashboardPage = () => {
  return (
    <>
      <DashboardNavbar />
      <main className="dashboard-container">
        <DashboardSummary />
        <div className="dashboard-main-content">
          <RecommendationSection />
          <NewsEventsSidebar />
          <FloatingChatbot />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;