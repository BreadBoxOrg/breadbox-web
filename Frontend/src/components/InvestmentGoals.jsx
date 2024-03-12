import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

// NOT FINISHED --- MERGE WITH SETTINGS BRANCH SOON: PICK UP AFTER
const data = [
  {
    name: 'Current Progress',
    uv: 65, 
    fill: '#8884d8', 
  }
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  color: 'white'
};

function InvestmentGoals() {
  return (
    <div style={{
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
      alignItems: 'center'
    }}>
      <div style={{
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        Investment Goals
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="25%" cy="50%" innerRadius="80%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise={true}
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InvestmentGoals;
