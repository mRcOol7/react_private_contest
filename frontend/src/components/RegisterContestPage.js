import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Done } from '@mui/icons-material'; // Import the Done icon
import './RegisterContestPage.css'; // Import CSS file

function RegisterContestPage() {
  const [contestData, setContestData] = useState({
    prizePool: '',
    spots: '',
    firstPrizes: '',
    validTill: '',
    platform: '',
    contestCode: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // State to control success message display

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contests', contestData);
      setShowSuccess(true); // Show success message
      setContestData({
        prizePool: '',
        spots: '',
        firstPrizes: '',
        validTill: '',
        platform: '',
        contestCode: ''
      });
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to register contest!'); // Set error message
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Contest</h2>
      {showSuccess && <div className="success-message">Contest registered successfully!</div>} {/* Show success message if showSuccess state is true */}
      <form onSubmit={handleSubmit}>
        <label className="register-label">Prize Pool</label>
        <input type="text" className="register-input" value={contestData.prizePool} onChange={(e) => setContestData({ ...contestData, prizePool: e.target.value })} />
        <label className="register-label">Spots</label>
        <input type="number" className="register-input" value={contestData.spots} onChange={(e) => setContestData({ ...contestData, spots: e.target.value })} />
        <label className="register-label">First Prizes (comma-separated)</label>
        <input type="text" className="register-input" value={contestData.firstPrizes} onChange={(e) => setContestData({ ...contestData, firstPrizes: e.target.value })} />
        <label className="register-label">Valid Till</label>
        <input type="date" className="register-input" value={contestData.validTill} onChange={(e) => setContestData({ ...contestData, validTill: e.target.value })} />
        <label className="register-label">Platform</label>
        <input 
          type="text" 
          className="register-input" 
          value={contestData.platform} 
          onChange={(e) => setContestData({ ...contestData, platform: e.target.value })} 
          placeholder="Dream11, My11circle, etc..." 
        />
        <label className="register-label">Contest Code</label>
        <input type="text" className="register-input" value={contestData.contestCode} onChange={(e) => setContestData({ ...contestData, contestCode: e.target.value })} />
        <button type="submit" className="register-button">
          <IconButton> {/* Wrap icon inside IconButton */}
            <Done /> {/* Material icon for submit */}
          </IconButton>
          Submit
        </button>
      </form>
      {/* Error Message Display */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default RegisterContestPage;
