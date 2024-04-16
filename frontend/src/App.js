import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterContestPage from './components/RegisterContestPage';
import ViewContestPage from './components/ViewContestPage';
import './App.css'; // Import CSS file

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to our Contest Registration Platform</h1>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register Contest</Link>
            </li>
            <li className="nav-item">
              <Link to="/view" className="nav-link">View Contests</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<RegisterContestPage />} />
          <Route exact path="/view" element={<ViewContestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
