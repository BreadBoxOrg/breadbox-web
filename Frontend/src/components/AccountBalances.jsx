import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getPlaidAccounts } from '../utils/http';

function AccountBalances() {
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const result = await getPlaidAccounts();
      if (result && result.accounts) {
        const filteredAccounts = result.accounts.filter(account => account.type !== 'loan' && account.subtype !== 'credit card');
        const formattedAccounts = filteredAccounts.map(account => ({
          name: `${account.name} (${account.mask})`,
          balance: `$${account.balances.current.toLocaleString()}`,
        }));
        setAccountData(formattedAccounts);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Card sx={{
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      width: '640px',
      height: '320px',
      overflow: 'hidden', // Ensures that the Card itself does not scroll
    }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>
          Account Balances
        </Typography>
        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List sx={{
          width: '100%',
          p: 0,
          overflowY: 'auto', // Enables vertical scrolling
          flex: 1, // Takes up the remaining space in the flex container
        }}>
          {accountData.map((account, index) => (
            <React.Fragment key={account.name}>
              <ListItem sx={{ p: 0, display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={account.name} primaryTypographyProps={{ fontSize: '1rem' }} />
                <Typography sx={{ fontWeight: 'medium' }}>{account.balance}</Typography>
              </ListItem>
              {index < accountData.length - 1 && <Divider sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default AccountBalances;
