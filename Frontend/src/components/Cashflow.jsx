/*
  * File: 
    *AssetDetails.jsx

  * Description: 
    * This file contains the code for the stocks widget shown in the finances page
    * It talks to the FinancialManagementGroup API to obtain stock information
    * It uses recharts for the visualization of the stock trends
    * Has a mini side bar on the left side for quick access to five given stocks
  * 
*/

import React, { useState, useContext, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { RecentRecurringMockData, MoneyEarnedMockData } from './mock_data/mockData';
import { useTranslation } from 'react-i18next';
import { AccessTokenContext } from "../App";
import { DataFetchContext } from '../context/DataFetchContext';

function CashFlow() {

  const {t} = useTranslation();
  const { transactionData } = useContext(DataFetchContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactionData.length > 0) {
      setIsLoading(false);
    }
  }, [transactionData]);

  const data = transactionData.map((item, index) => {
    const expense = transactionData[index] ? transactionData[index].value : 0;
    return {
      name: item.name,
      MoneyEarned: item.amt,
      RecurringCosts: -expense, // Neg to represent outflow
    };
  });

  return (
    <div style={{
      backgroundColor: '#141516',
      padding: '20px',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative'
    }}>
      <div style={{
        borderBottom: '2px solid #1ADBA9',
        paddingBottom: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>{t('dashboard.cash-flow')}</h2>
        <div style={{ position: 'relative' }}></div>
      </div>

      {isLoading ? (
        <div role="status" class="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '250px' }}>
          <div class="flex items-center justify-center w-2/3 h-12 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          <div class="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div class="flex items-center mt-4">
            <div>
              <div class="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#c0392b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="white" axisLine={false} />
            <YAxis stroke="white" axisLine={false} />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip wrapperStyle={{ backgroundColor: '#2C2C2E' }} />
            <Legend />
            <Area type="monotone" dataKey="MoneyEarned" stroke="#2ecc71" fillOpacity={1} fill="url(#colorU)" strokeWidth='2px' />
            <Area type="monotone" dataKey="RecurringCosts" stroke="#c0392b" fillOpacity={1} fill="url(#colorD)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
        )}
    </div>
  );
}

export default CashFlow;
