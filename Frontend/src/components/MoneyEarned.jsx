import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { getPlaidMonthlyIncome } from '../utils/http';
// import { MoneyEarnedMockData as data } from './mock_data/mockData';

function MoneyEarned() {
  const [anchorEl, setAnchorEl] = useState(null); // dropdown from MUI
  const [selectedOption, setSelectedOption] = useState("Monthly");

  const [incomeData, setIncomeData] = useState([]); // THIS IS GOING TO HOLD THE TRANSACTION DATA

  useEffect(() => {
    async function fetchIncome() {
      
      const promise = getPlaidMonthlyIncome("2024-01-20");
      promise.then((income) => { 
        // create local transaction object list
        let incomeDisplayList = [];
        console.log("DEBUG_INCOME: " + income.monthly_break_down);
        console.log("DEBUG_INCOME: " + income.yearly_total);
        console.log("DEBUG_INCOME: " + income.error);
        // loop through transactions.recuring_costs
        const monthNames = [
          "January", "February", "March", 
          "April", "May", "June", 
          "July", "August", "September", 
          "October", "November", "December"
        ];
        
        for(let i = 0; i < 6; i++) {
          // create temp object add name and amount 
          let item = income.monthly_break_down[i];
          console.log(item);
          let displayMonth = monthNames[item.month-1];
          let integerAmount =  Math.floor(item.income);          
          console.log(integerAmount);
          const displayItem = {
            name: displayMonth,
            amt: integerAmount    
          };
          incomeDisplayList.push(displayItem);
        }

        setIncomeData(incomeDisplayList);
      }).catch((err) => { console.log(err)});

    }
    fetchIncome();
  }, []);

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
        backgroundColor: '#1E1E1E',
        color: 'white',
        paddingBottom: '60px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          borderBottom: '2px solid #2ecc71',
          paddingBottom: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
          <Typography variant="h5" sx={{ margin: 0, color: 'white' }}>Money Earned</Typography> {/* slowly changing to MUI styling */}
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                backgroundColor: '#2C2C2E', 
                color: 'white', 
                border: '1px solid #2ecc71', 
                borderRadius: '10px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#3C3C3E', // slightly darker on hover
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
      </Paper>
    </div>
  );
}

export default MoneyEarned;
