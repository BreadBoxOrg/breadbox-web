import React, { useState, useEffect } from 'react';
import { getPlaidAccounts } from '../utils/http'; // Adjust the import path as necessary

function SavingsGoal() {
  const [tooltip, setTooltip] = useState({ show: false, amount: '' });
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const goalAmount = 60000; 


  const milestones = [
    { amount: goalAmount * 0.25, position: '25%' },
    { amount: goalAmount * 0.5, position: '50%' },
    { amount: goalAmount * 0.75, position: '75%' },
    { amount: goalAmount, position: '100%' }
  ].map(milestone => ({ ...milestone, amount: `$${milestone.amount.toLocaleString()}` }));

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPlaidAccounts();
      if (result && result.accounts) {
        const filteredAccounts = result.accounts.filter(account => account.type !== 'loan' && account.subtype !== 'credit card');
        setAccounts(filteredAccounts);
        if (filteredAccounts.length > 0) {
          setSelectedAccountId(filteredAccounts[0].account_id);
          updateProgress(filteredAccounts[0].account_id, filteredAccounts);
        }
      }
    };

    fetchData();
  }, []);

  const updateProgress = (accountId, accounts) => {
    const account = accounts.find(acc => acc.account_id === accountId);
    if (account) {
      const balance = account.balances.current;
      setProgressPercentage(((balance / goalAmount) * 100).toFixed(2));
    }
  };

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
    updateProgress(event.target.value, accounts);
  };

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
      minHeight: '150px' 
    }}>
      <div style={{ marginBottom: '10px' }}>
        <select value={selectedAccountId} onChange={handleAccountChange} style={{ padding: '5px' }}>
          {accounts.map(account => (
            <option key={account.account_id} value={account.account_id}>
              {account.name} ({account.mask})
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '18px' }}>Savings Goal</div>
        <div style={{ fontSize: '12px' }}>${goalAmount.toLocaleString()} Goal</div>
      </div>
      <div style={{ position: 'relative', height: '20px', backgroundColor: '#2C2C2E', borderRadius: '10px' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: `${100 - progressPercentage}%`, 
          backgroundColor: '#2ecc71',
          borderRadius: '10px'
        }}></div>
        {milestones.map((milestone, index) => (
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
                backgroundColor: parseFloat(milestone.position) <= progressPercentage ? '#2ecc71' : '#555', 
                cursor: 'pointer',
                zIndex: 1
              }}
              onMouseEnter={() => showTooltip(milestone.amount)}
              onMouseLeave={hideTooltip}
            ></div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: '14px', marginTop: '10px' }}>{progressPercentage}% to complete</div>
    </div>
  );
}

export default SavingsGoal;
