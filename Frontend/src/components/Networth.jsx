/*
  * File: 
    *InvestmentGoals.jsx

  * Description: 
    * Networth component is a React functional component used to display the total net worth of the user.
    * The component fetches the user's account data from the Plaid API and calculates the total net worth.
    * The user can toggle between including and excluding debts from the net worth calculation.
    * The component uses the getPlaidAccounts function from the http.js file to fetch the user's account data.
  * 
*/


import React, { useEffect, useState } from 'react';
import { getPlaidAccounts } from '../utils/http';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

function Networth() {
  const [netWorth, setNetWorth] = useState(0); // HOLDS DATA
  const [includeDebt, setIncludeDebt] = useState(false); // HOLDS TOGGLE STATE

  const { t } = useTranslation();
  
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
      backgroundColor: '#141516',
      padding: '20px',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative',
      width: '100%',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        {t('dashboard.total-net')}:
      </div>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold'
      }}> ${netWorth.toLocaleString()}
       
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
        label={includeDebt ? t('dashboard.exclude-debt') : t('dashboard.include-debt')}
      />
    </div>
  );
}

export default Networth;
