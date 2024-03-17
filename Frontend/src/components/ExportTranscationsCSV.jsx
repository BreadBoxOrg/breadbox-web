import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv';
import { getPlaidTransactions } from "../utils/http.js";

function TransactionDataCSV () {

    const [transactionData, setTransactionData] = useState([]); // THIS IS GOING TO HOLD THE TRANSACTION DATA

  useEffect(() => {
    async function fetchTransactions() {
      const promise = getPlaidTransactions();
      promise.then((transactions) => { 
        // create local transaction object list
        let transactionsDisplayList = [];
        console.log("ONE TIME COST ARRAY:", transactions.one_time_cost);
        // loop through transactions.recuring_costs
        let i = 1;
        transactions.one_time_cost.forEach( item => {
          // create temp object add name and amount 
          console.log(item);
          const displayItem = {
            merchant_name: item.accountId.merchantName,
            date: item.accountId.date,
            amount: item.accountId.amount
          };
          i++;
          console.log("DISPLAY ITEM:", displayItem);
          transactionsDisplayList.push(displayItem);
        });

        setTransactionData(transactionsDisplayList);
      }).catch((err) => { console.log(err)});

    }
    fetchTransactions();
  }, []);

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center',
        marginLeft: '145px',
    };

    return(<>
        {transactionData.length > 0 && (
            <CsvDownloadButton data={transactionData} filename="transaction_data" style={buttonStyle}>
                Export Transaction Data
            </CsvDownloadButton>
        )}
        </>);
}

export default TransactionDataCSV;