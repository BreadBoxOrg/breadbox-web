import React from 'react';
import styles from './Dashboard.module.css';
import MoneyEarned from '../components/MoneyEarned.jsx';
import RecentRecurring from '../components/RecentRecurring.jsx';
import Crypto from '../components/Crypto.jsx'
import Networth from '../components/Networth.jsx';
import SavingsGoal from '../components/SavingsGoal.jsx';
import NavbarLayout from '../components/SideBar.js';
import CashFlow from '../components/Cashflow.jsx';
import ChatBotAssistant from '../components/ChatBot.jsx';

function Dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <NavbarLayout></NavbarLayout>
      <body className={styles.dashboard}>
        <div className={styles.parent}>
          <div className={styles.div2}> <MoneyEarned/> </div>
          <div className={styles.div3}> <RecentRecurring/> </div>
          <div className={styles.div4}> <CashFlow/> </div>
          <div className={styles.div5}> <Crypto/> </div>
          <div className={styles.div6}><Networth/> <SavingsGoal/> </div>
          <div className={styles.div7}><ChatBotAssistant/> </div>
          <div className={styles.div8}><h1>Welcome, BreadboxTest</h1><p>{date}</p></div>
          <div className={styles.div9}> </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;