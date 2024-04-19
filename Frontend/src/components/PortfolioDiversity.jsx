import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { detailedData } from './mock_data/mockData';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PortfolioDiversity() {

  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState('Stocks');

  const data = [
    { name: 'Stocks', value: 40000 },
    { name: 'Bonds', value: 30000 },
    { name: 'ETFs', value: 30000 },
    { name: 'Cash', value: 42000 },
  ];

  useEffect(() => {
    if (data.length > 0 && !data.find(item => item.name === selectedCategory)) {
      setSelectedCategory(data[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      padding: '0.5vw', // Adjusted padding to use vw for better responsiveness
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-around', 
      width: '100%',
      height: '100%' 
    }}>
      <div>
        <div style={{ fontSize: '18px', marginBottom: '10px'}}>
          {t('finances.portfolio-diversity')}
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
      </div>
      <div style={{
        width: '300px', 
        height: '100%', 
        padding: '0.3vw', 
        backgroundColor: '#2E2E2E',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      }}>
        <h3 style={{ color: 'white' }}>{selectedCategory} Details</h3>
        <ul style={{ color: 'white' }}>
          {(detailedData[selectedCategory] || []).map((item, index) => (
            <li key={index}>{item.name}: ${item.value.toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PortfolioDiversity;
