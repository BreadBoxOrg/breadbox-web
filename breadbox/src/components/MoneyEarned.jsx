import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'January', amt: 2400,
    },
    {
      name: 'February', amt: 2210,
    },
    {
      name: 'March', amt: 2290,
    },
    {
      name: 'April', amt: 2000,
    },
    {
      name: 'May', amt: 2181,
    },
    {
      name: 'June', amt: 2500,
    },
  ];

function MoneyEarned() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  /* const generateColor = (index, isActive) => {
    const hue = (360 * index) / data.length;
    const lightness = isActive ? 85 : 70;
    return `hsl(${hue}, 100%, ${lightness}%)`;
  }; */

  return (
    <div style={{ position: 'relative', width: '800px', margin: 'auto' }}>
      <div style={{
        position: 'relative',
        margin: 'auto',
        backgroundColor: '#1E1E1E',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        paddingBottom: '60px',
        zIndex: 3
      }}>
        <div style={{
          borderBottom: '2px solid #2ecc71',
          paddingBottom: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>Money Earned</h2>
          <div style={{ position: 'relative' }}>
            <button onClick={toggleDropdown} style={{
              backgroundColor: '#2C2C2E',
              color: 'white',
              padding: '10px 20px',
              border: '1px solid #2ecc71',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              outline: 'none'
            }}>
              Monthly ▼
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                backgroundColor: '#2C2C2E',
                marginTop: '5px',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                zIndex: 4
              }}>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Monthly</div>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Quarterly</div>
                <div style={{ padding: '10px', cursor: 'pointer' }}>Yearly</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MoneyEarned;
