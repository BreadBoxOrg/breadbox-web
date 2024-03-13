import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

// Dummy data for account balances
const accountData = [
  { name: 'Brokerage Account', balance: '$25,000' },
  { name: 'Retirement Account', balance: '$40,000' },
  { name: 'Savings Account', balance: '$15,300' },
  { name: 'Checking Account', balance: '$2,250' },
];

function AccountBalances() {
  return (
    <Card sx={{
      backgroundColor: 'rgba(30, 30, 30, 0.9)', 
      borderRadius: '20px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      width: '100%', 
      maxWidth: '700px', 
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>
          Account Balances
        </Typography>
        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List sx={{ width: '100%', p: 0 }}>
          {accountData.map((account, index) => (
            <ListItem key={account.name} sx={{ p: 0, display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={account.name} primaryTypographyProps={{ fontSize: '1rem' }} />
              <Typography sx={{ fontWeight: 'medium' }}>{account.balance}</Typography>
              {index < accountData.length - 1 && <Divider sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default AccountBalances;
