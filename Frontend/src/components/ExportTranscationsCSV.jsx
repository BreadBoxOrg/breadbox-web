import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv';
import { getPlaidTransactions } from "../utils/http.js";
import { useTranslation } from 'react-i18next';

function TransactionDataCSV ({ rerender }) {

    const { t } = useTranslation();

    const [transactionData, setTransactionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                setIsLoading(true);
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
            } finally {
                setIsLoading(false);
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

    const NoDataOrLoading = {
        ...buttonStyle,
        opacity: 0.5, 
        cursor: 'auto' 
    };

    return (
        <>
            {isLoading ? (
                <button style={NoDataOrLoading} disabled>{t('settings.export-loading')}</button>
            ) : transactionData.length > 0 ? (
                <CsvDownloadButton data={transactionData} filename="transaction_data" style={buttonStyle}>
                    {t('settings.export-transactions-csv')}
                </CsvDownloadButton>
            ) : (
                <button style={NoDataOrLoading} disabled>{t('settings.export-no-transaction-data')}</button>
            )}
        </>
    );
}

export default TransactionDataCSV;
