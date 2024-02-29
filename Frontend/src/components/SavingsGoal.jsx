import React, { useState } from 'react';
import { MockSavingsGoalData as data } from './mock_data/mockData';

function SavingsGoal() {
  const [tooltip, setTooltip] = useState({ show: false, amount: '' });



  const showTooltip = (amount) => {
    setTooltip({ show: true, amount });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, amount: '' });
  };

  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      padding: '20px',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative',
      width: '300px',
      height: '100px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '18px' }}>Savings Goal</div>
        <div style={{ fontSize: '12px' }}>$60,000 Goal</div>
      </div>
      <div style={{ position: 'relative', height: '20px', backgroundColor: '#2C2C2E', borderRadius: '10px' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: '25%', // Adjusted to show current progress
          backgroundColor: '#2ecc71',
          borderRadius: '10px'
        }}></div>
        {data.map((milestone, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                position: 'absolute',
                left: milestone.position,
                top: '50%',
                transform: 'translate(-50%, -40px)',
                whiteSpace: 'nowrap',
                visibility: tooltip.show && tooltip.amount === milestone.amount ? 'visible' : 'hidden'
              }}
            >
              {milestone.amount}
            </div>
            <div
              style={{
                position: 'absolute',
                left: milestone.position,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: index <= 2 ? '#2ecc71' : '#555', // Adjust color based on completion
                cursor: 'pointer',
                zIndex: 1
              }}
              onMouseEnter={() => showTooltip(milestone.amount)}
              onMouseLeave={hideTooltip}
            ></div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: '14px', marginTop: '10px' }}>75% to complete</div>
    </div>
  );
}

export default SavingsGoal;
