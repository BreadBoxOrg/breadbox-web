/*
  * File: 
    *AccountBalances.jsx

  * Description: 
    * This file contains the code for the AccountBalances component, which displays the user's account balances.
    * The component fetches the account data from the DataFetchContext and displays it in a list format.
    * The account data is fetched from the Plaid API using the getPlaidAccounts function from the utils/http.js file.
  * 
*/

import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useContext } from 'react';
import { DataFetchContext } from '../context/DataFetchContext';
import { useTranslation } from 'react-i18next';

function AccountBalances() {

  const {t} = useTranslation();
  const { accountData } = useContext(DataFetchContext);

  return (
    <Card sx={{
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      width: '100%',
      height: '100%',
      overflow: 'hidden', 
    }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>
          {t('finances.account-balances')}
        </Typography>
        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List sx={{
          width: '100%',
          p: 0,
          overflowY: 'auto', 
          flex: 1, 
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
