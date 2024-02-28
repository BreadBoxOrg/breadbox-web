import React from 'react';
import './Dashboard.css';
import MoneyEarned from '../components/MoneyEarned.jsx';
import RecentRecurring from '../components/RecentRecurring.jsx';
import Crypto from '../components/Crypto.jsx'
import Networth from '../components/Networth.jsx';
import SavingsGoal from '../components/SavingsGoal.jsx';
import Finances from '../components/Finances.jsx';
import NavbarLayout from '../components/SideBar.js';

function Dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (<>
  <NavbarLayout></NavbarLayout>
  <body className='dashboard'>
    <div className="parent"> {/* Corrected "class" to "className" for React */}
      <div className="div2"> <MoneyEarned/> </div>
      <div className="div3"> <RecentRecurring/> </div>
      <div className="div4"> <Finances/></div>
      <div className="div5"> <Crypto/> </div>
      <div className="div6"><Networth/> <SavingsGoal/> </div>
      <div className="div7"> </div>
      <div className="div8"><h1>Welcome, BreadboxTest</h1><p>{date}</p></div>
      <div className="div9"> </div>
    </div> 
  </body>
  </>
  );
}

export default Dashboard;