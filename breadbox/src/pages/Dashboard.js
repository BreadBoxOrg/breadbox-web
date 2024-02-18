import React from 'react';
import './Dashboard.css';
import MoneyEarned from '../components/MoneyEarned.jsx';
// import RecentRecurring from '../components/RecentRecurring.jsx';
// import Crypto from '../components/Crypto.jsx'

function Dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div class="parent">
    <div class="div1"> </div>
    <div class="div2"> <MoneyEarned/> </div>
    {/* <div class="div3"> <RecentRecurring/> </div> */}
    <div class="div4"> </div>
    {/* <div class="div5"> <Crypto/> </div> */}
    <div class="div6"></div>
    <div class="div7"> </div>
    <div class="div8"><h1>Welcome, BreadboxTest</h1><p>{date}</p></div>
    <div class="div9"> </div>
    </div> 
  );
}
 export default Dashboard