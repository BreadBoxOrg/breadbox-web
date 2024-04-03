import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import { getPlaidTransactions } from '../utils/http';
import { useContext } from "react";
import { DataFetchContext } from '../context/DataFetchContext';


const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none', 
            color: 'white',
            fontFamily: 'Arial, sans-serif', 
            fontSize: '0.875rem', 
            '.MuiDataGrid-cell': {
              borderBottom: 'none',
              '&:focus': {
                outline: 'none', 
              },
              '&:focus-within': {
                outline: 'none', 
              },
            },
            '.MuiDataGrid-columnHeaders': {
              borderBottom: '2px solid #2ecc71', 
              color: 'white',
            },
          },
        },
      },
    },
  });
  

const columns = [

  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    // renderCell: (params) => {
    //   let icon;
    //   switch (params.value) {
    //     case 'From Market Basket':
    //       icon = <ShoppingCartIcon style={{ color: 'white' }} />;
    //       break;
    //     case 'From Hulu':
    //       icon = <TvIcon style={{ color: 'white' }} />;
    //       break;
    //     case 'From Amtrak':
    //       icon = <TrainIcon style={{ color: 'white' }} />;
    //       break;

    //     default:
    //       icon = <></>; 
    //   }
    //   return (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       {icon}
    //       <span style={{ marginLeft: '10px' }}>{params.value}</span>
    //     </div>
    //   );
    // },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 130,
    renderCell: (params) => {
      return (
        <span style={{ color: params.value < 0 ? '#f44336' : '#4caf50' }}>
          {params.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </span>
      );
    },
  },
];
// const rows = [ // MOCK DATA
//   { id: 1, title: 'From Market Basket', date: '2024-03-24', amount: -246.99 },
//   { id: 2, title: 'From Hulu', date: '2024-03-18', amount: -16.99 },
//   { id: 3, title: 'From Amtrak', date: '2024-03-15', amount: -77.50 },

// ];

const Transactions = () => {

  // const [transactionData, setTransactionData] = useState([]); // THIS IS GOING TO HOLD THE TRANSACTION DATA
  const { dropdownData } = useContext(DataFetchContext);

  // useEffect(() => {
  //   async function fetchTransactions() {
  //     const promise = getPlaidTransactions();
  //     promise.then((transactions) => { 
  //       // create local transaction object list
  //       let transactionsDisplayList = [];
  //       // console.log("ONE TIME COST ARRAY:", transactions.one_time_cost);
  //       // loop through transactions.recuring_costs
  //       let i = 1;
  //       transactions.one_time_cost.forEach( item => {
  //         // create temp object add name and amount 
  //         console.log(item);
  //         const displayItem = {
  //           id: i,
  //           title: item.accountId.merchantName,
  //           date: item.accountId.date,
  //           amount: item.accountId.amount
  //         };
  //         i++;
  //         // console.log("DISPLAY ITEM:", displayItem);
  //         transactionsDisplayList.push(displayItem);
  //       });

  //       setTransactionData(transactionsDisplayList);
  //     }).catch((err) => { console.log(err)});

  //   }

  //   fetchTransactions();
  // }, []);

    return (
      <ThemeProvider theme={theme}>
        <div style={{ height: '300px', width: '100%', backgroundColor: '#1E1E1E'}}>
          <Typography variant="h6" component="div" style={{ color: 'white'}}>
            Recent Transactions
          </Typography>
          <DataGrid
            rows={dropdownData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </ThemeProvider>
    );
}
  export default Transactions;