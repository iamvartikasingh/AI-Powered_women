// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
// Import other pages as needed
// import IntakeForm from './components/pages/IntakeForm';
// import ProcessingPage from './components/pages/ProcessingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Add more routes as needed */}
      {/* <Route path="/intake" element={<IntakeForm />} /> */}
      {/* <Route path="/processing" element={<ProcessingPage />} /> */}
    </Routes>
  );
};

export default App;