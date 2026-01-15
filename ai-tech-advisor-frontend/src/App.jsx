import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import LandingPage from './Component/LandingPage';
import RecommendationForm from './Component/RecommendationForm';
import ResultPage from './Component/ResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<RecommendationForm />} />
            <Route path="/results" element={<ResultPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>AI Technology Recommendation System</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              &copy; {new Date().getFullYear()} Final Year Engineering Project
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
