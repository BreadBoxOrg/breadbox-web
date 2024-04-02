import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv';
import { getPlaidTransactions } from "../utils/http.js";

function TransactionDataCSV ({ rerender }) {

    const [transactionData, setTransactionData] = useState([]); // THIS IS GOING TO HOLD THE TRANSACTION DATA

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const transactions = await getPlaidTransactions();
                let transactionsDisplayList = [];
                transactions.one_time_cost.forEach(item => {
                    const displayItem = {
                        merchant_name: item.accountId.merchantName,
                        date: item.accountId.date,
                        amount: item.accountId.amount
                    };
                    transactionsDisplayList.push(displayItem);
                });
    
                setTransactionData(transactionsDisplayList);
            } catch (error) {
                console.error("Error fetching Plaid transactions:", error);
            }
        }
        fetchTransactions();
    }, [rerender]);

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
      textAlign: 'center'
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