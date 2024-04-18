import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { AccessTokenContext } from "../App";
import { DataFetchContext } from '../context/DataFetchContext';

function MoneyEarned() {
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [selectedOption, setSelectedOption] = React.useState("Monthly");

  const { accessToken } = useContext(AccessTokenContext);
  const { incomeData } = useContext(DataFetchContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      setSelectedOption(option);
    }
    setAnchorEl(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%', margin: 'auto' }}>
      <Paper elevation={3} sx={{
        margin: 'auto',
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: '#141516',
        color: 'white',
        paddingBottom: '60px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          borderBottom: '2px solid #1ADBA9',
          paddingBottom: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ margin: 0, fontSize: '24px', color: 'white' }}>Money Earned</Typography>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                backgroundColor: '#2C2C2E', 
                color: 'white', 
                border: '1px solid #1ADBA9', 
                borderRadius: '10px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#3C3C3E',
                },
              }}
            >
              {selectedOption} ▼
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#2C2C2E',
                  color: 'white',
                },
              }}
            >
              <MenuItem onClick={() => handleClose("Monthly")}>Monthly</MenuItem>
              <MenuItem onClick={() => handleClose("Quarterly")}>Quarterly</MenuItem>
              <MenuItem onClick={() => handleClose("Yearly")}>Yearly</MenuItem>
            </Menu>
          </div>
        </div>

        {incomeData.length > 0 ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={incomeData}
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
) : (
  <div role="status" class="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700" style={{ height: '250px' }}>
    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-2.5"></div>
    <div class="flex items-end justify-between mt-4" style={{ height: '200px' }}>
      <div class="w-1/5 h-1/4 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
      <div class="w-1/5 bg-gray-200 rounded-t-lg h-1/2 dark:bg-gray-700"></div>
      <div class="w-1/5 bg-gray-200 rounded-t-lg h-1/3 dark:bg-gray-700"></div>
      <div class="w-1/5 bg-gray-200 rounded-t-lg h-2/3 dark:bg-gray-700"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
)}
      </Paper>
    </div>
  );
}

export default MoneyEarned;
