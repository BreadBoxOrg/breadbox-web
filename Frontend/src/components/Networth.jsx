import React, { useEffect, useState } from 'react';
import { getPlaidAccounts } from '../utils/http';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Networth() {
  const [netWorth, setNetWorth] = useState(0); // HOLDS DATA
  const [includeDebt, setIncludeDebt] = useState(false); // HOLDS TOGGLE STATE
  
  useEffect(() => {
    function calculateNetWorth() {
      const promise = getPlaidAccounts();
      promise.then((accountsData) => {
        if (accountsData && accountsData.accounts) {
          let totalNetWorth = 0;
          
          accountsData.accounts.forEach(account => {
            const balanceToUse = account.balances.available !== null ? account.balances.available : account.balances.current;
            if (account.type === 'loan') {
              if (includeDebt) {
                totalNetWorth -= balanceToUse; // minus loans/debts
              }
            } else {
              totalNetWorth += balanceToUse; // add balances
            }
          });
          setNetWorth(totalNetWorth);
        }
      }).catch((err) => {
        console.error("Error calculating net worth:", err);
      });
    }
    calculateNetWorth();
  }, [includeDebt]); // ADD includeDebt TO DEPENDENCY ARRAY
  
  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      padding: '20px',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative',
      width: '300px',
      height: '80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        Total Net Worth:
      </div>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        ${netWorth.toLocaleString()}
      </div>
      <FormControlLabel
        control={
          <Switch
            checked={includeDebt}
            onChange={() => setIncludeDebt(!includeDebt)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'green', '& + .MuiSwitch-track': { backgroundColor: 'green' },
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'lightgrey',
              },
              '& .MuiSwitch-switchBase': {
                color: 'red', '& + .MuiSwitch-track': { backgroundColor: 'lightgrey' },
              },
            }}
          />
        }
        label={includeDebt ? "Exclude Debt" : "Include Debt"}
      />
    </div>
  );
}

export default Networth;
