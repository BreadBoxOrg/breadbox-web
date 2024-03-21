import React from 'react';
import MoneyEarned from '../components/MoneyEarned.jsx';
import RecentRecurring from '../components/RecentRecurring.jsx';
import Crypto from '../components/Crypto.jsx';
import Networth from '../components/Networth.jsx';
import SavingsGoal from '../components/SavingsGoal.jsx';
import NavbarLayout from '../components/SideBar.js';
import CashFlow from '../components/Cashflow.jsx';
import ChatBotAssistant from '../components/chatbot/ChatBot.jsx';

function Dashboard() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <NavbarLayout />
      <div className="ml-0 pt-[200px] md:ml-[275px] md:pt-0">
        <div className="flex flex-col gap-[30px] mx-[10px] md:mx-0 md:ml-[0.5vw] overflow-x-auto max-w-full md:max-w-[82vw] pb-[20px]"> 
          {/* header */}
          <div className="font-bold text-[#1ADBA9] mt-5 text-3xl">Welcome, BreadboxTest</div>
          {/* date text */}
          <p className="text-[#8f8f8f]">{date}</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] md:gap-[40px]">
            {/* FIRST ROW*/}
            <div className="col-span-1 md:col-span-3"><MoneyEarned /></div>
            <div className="col-span-1 md:col-span-2"><RecentRecurring /></div>
            {/* SECOND ROW*/}
            <div className="flex flex-col gap-[20px] md:gap-[40px]">
              <div className="flex-1"><Networth /></div>
              <div className="flex-1"><SavingsGoal /></div>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <div className="flex-1"><Crypto /></div>
            </div>
            <div className="col-start-1 md:col-start-4 col-span-1 md:col-span-2"><CashFlow /></div>
          </div>
          <div className="fixed bottom-[20px] right-[20px] z-50"><ChatBotAssistant /></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
