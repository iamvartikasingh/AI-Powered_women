import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardSummary from '../components/DashboardSummary';
import RecommendationSection from '../components/RecommendationSection';
import NewsEventsSidebar from '../components/NewsEventsSidebar';
import Footer from '../components/Footer';
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <>
      <DashboardNavbar />
      <main className="dashboard-container">
        <DashboardSummary />
        <div className="dashboard-main-content">
          <RecommendationSection />
          <NewsEventsSidebar />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;