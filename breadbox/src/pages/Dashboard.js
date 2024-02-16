import React from 'react';
import './Dashboard.css';
import MoneyEarned from '../components/MoneyEarned.jsx';
import RecentRecurring from '../components/RecentRecurring.jsx';

function Dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome, BreadboxTest</h1>
        <p>{date}</p>
      </div>
       <RecentRecurring />   
      <MoneyEarned />

    </div>
  );
}

export default Dashboard;
