import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { FileCopy } from '@mui/icons-material'; // Import the copy icon
import './ViewContestPage.css'; // Import CSS file

function ViewContestPage() {
  const [contests, setContests] = useState([]);
  const [copiedId, setCopiedId] = useState(null); // State to track copied contest ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contests');
        setContests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch contests initially
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const updatedContests = contests.filter(contest => {
        const contestTime = new Date(contest.validTill).getTime();
        return contestTime > currentTime; // Keep contests that are not expired
      });
      setContests(updatedContests);
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval); // Cleanup interval
  }, [contests]);

  const handleCopyCode = async (contestId) => {
    try {
      const contest = contests.find(contest => contest._id === contestId);
      if (contest) {
        await navigator.clipboard.writeText(contest.contestCode);
        setCopiedId(contestId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderExpiryMessage = (validTill) => {
    const expiryDate = new Date(validTill);
    const currentTime = new Date();
    const timeDifference = expiryDate.getTime() - currentTime.getTime();
    const hoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60));
    
    console.log("Hours Remaining:", hoursRemaining); // Add this line for debugging
  
    if (hoursRemaining <= 24) {
      return <p className="expiry-message">This contest will be removed in {hoursRemaining} hours</p>;
    }
    return null;
  };
  

  // Function to render the Valid Till date without time
  const renderValidTillDate = (validTill) => {
    const expiryDate = new Date(validTill);
    return expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="view-contest-container">
      <h2 className="view-contest-heading">View Contests</h2>
      <p className="total-contests">Total Contests: {contests.length}</p> {/* Display total number of contests */}
      {contests.length === 0 && <p>No contests registered yet</p>} {/* Show message if no contests are registered */}
      <ul className="contest-list">
        {contests.map((contest, index) => (
          <li key={contest._id} className="contest-item">
            <p>Contest {index + 1}:</p> {/* Display contest number */}
            <p>Prize Pool: {contest.prizePool}</p>
            <p>Spots: {contest.spots}</p>
            <p>First Prizes: {contest.firstPrizes.join(', ')}</p>
            <p>Valid Till: {renderValidTillDate(contest.validTill)}</p> {/* Render Valid Till date without time */}
            <p>Platform: {contest.platform}</p>
            <p>Contest Code: {contest.contestCode}</p>
            {renderExpiryMessage(contest.validTill)}
            <IconButton className="copy-button" onClick={() => handleCopyCode(contest._id)}>
              <FileCopy /> {/* Material icon for copying */}
              {copiedId === contest._id ? 'Copied' : 'Copy Code'}
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewContestPage;
