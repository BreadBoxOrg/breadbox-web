import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';


const investmentGoal = 200000;
const currentAmount = 52400;

const checkpoints = [0.25, 0.5, 0.75, 1].map((checkpoint) => ({
  name: `${checkpoint * 100}% Goal`,
  value: investmentGoal * checkpoint,
  fill: checkpoint * investmentGoal <= currentAmount ? '#82ca9d' : '#8884d8', 
}));


const data = [
  ...checkpoints,
  {
    name: 'Current Progress',
    value: currentAmount,
    fill: '#ffc658',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  color: 'white',
};

function InvestmentGoals() {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        position: 'relative',
        width: '550px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '18px', marginBottom: '10px' }}>Investment Goals</div>
      <div
        style={{
          position: 'absolute',
          zIndex: 10, 
          color: 'white',
          fontSize: '25px',
          textAlign: 'center',
          top: '40%',
        }}
      >
          {formatCurrency(currentAmount)} <br /> of <br /> {formatCurrency(investmentGoal)}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            background
            clockWise={true}
            dataKey="value"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InvestmentGoals;
