import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { detailedData } from './mock_data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PortfolioDiversity() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = [
    { name: 'Stocks', value: 40000 },
    { name: 'Bonds', value: 30000 },
    { name: 'ETFs', value: 30000 },
    { name: 'Cash', value: 42000 },
  ];

  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      padding: '20px',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      width: '500px', 
      Height: '630px', 
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
    }}>
      <div style={{
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        Portfolio Diversity
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={(entry) => entry.name}
          onClick={(data, index) => {
            setSelectedCategory(data.name);
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      {selectedCategory && (
        <div style={{
          width: '100%', 
          height: '120px',
          marginTop: '20px', 
          padding: '10px',
          backgroundColor: '#2E2E2E',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}>
          <h3 style={{ color: 'white' }}>{selectedCategory} Details</h3>
          <ul style={{ color: 'white' }}>
            {detailedData[selectedCategory].map((item, index) => (
              <li key={index}>{item.name}: ${item.value.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PortfolioDiversity;