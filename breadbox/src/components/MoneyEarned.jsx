import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Menu, MenuItem, Paper, Typography } from '@mui/material';

const data = [ // cleanup
  { name: 'January', amt: 2400 },
  { name: 'February', amt: 2210 },
  { name: 'March', amt: 2290 },
  { name: 'April', amt: 2000 },
  { name: 'May', amt: 2181 },
  { name: 'June', amt: 2500 },
];

function MoneyEarned() {
  const [anchorEl, setAnchorEl] = useState(null); // using dropdown from MUI
  const [selectedOption, setSelectedOption] = useState("Monthly");

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
    <div style={{ position: 'relative', width: '800px', margin: 'auto' }}>
      <Paper elevation={3} sx={{
        margin: 'auto',
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: '#1E1E1E',
        color: 'white',
        paddingBottom: '60px'
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
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
      </Paper>
    </div>
  );
}

export default MoneyEarned;
