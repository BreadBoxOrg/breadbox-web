/*
  * File: 
    *InvestmentGoals.jsx

  * Description: 
    * This component displays the user's investment goals and their progress towards that goal.
    * The component displays a radial bar chart that shows the user's progress towards their investment goal.
  * 
*/

import React, { useContext } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
// import { useContext } from 'react';
import { DataFetchContext } from '../context/DataFetchContext';

const investmentGoal = 200000; //user would set this



const portfolioWorths = [ //placeholder
  { date: '2023-01-01', value: 98000 },
  { date: '2023-02-01', value: 104000 },
  { date: '2023-03-01', value: 110000 },
  { date: '2023-04-01', value: 102400 },
];

function InvestmentGoals() {
  
  const { totalInvestmentAmount } = useContext(DataFetchContext);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const data = [
    {
      name: 'Goal',
      value: investmentGoal,
      fill: '#8884d8', 
    },
    {
      name: 'Current Progress',
      value: totalInvestmentAmount,
      fill: '#ffc658', 
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        padding: '0.5vw',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '50%',
        }}
      > 
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>Investment Goals</div>
        <div
            style={{
              position: 'absolute',
              zIndex: 2,
              color: 'white',
              fontSize: '25px',
              textAlign: 'center',
              top: '38%',
              left: '17%',
            }}
          >
        {formatCurrency(totalInvestmentAmount)} <br /> of <br /> {formatCurrency(investmentGoal)} 
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="80%" barSize={10} data={data}>
            <RadialBar
              minAngle={15}
              background
              clockWise={true}
              dataKey="value"
              cornerRadius={50}
            />
            
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          height: '100%',
        }}
      >
        <div
          style={{
            marginBottom: '10px',
          }}
        > 
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>Goal: {formatCurrency(investmentGoal)}</div>
          <hr style={{ width: '100%', color: 'white', marginBottom: '10px'}} />
          {portfolioWorths.map((worth, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {`${worth.date}: ${formatCurrency(worth.value)}`}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart
            data={portfolioWorths}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InvestmentGoals;
