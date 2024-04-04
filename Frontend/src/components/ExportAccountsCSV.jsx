import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv';
import { getPlaidAccounts } from "../utils/http.js";
import TransactionDataCSV from "./ExportTranscationsCSV.jsx";

function AccountDataCSV({ rerender }) {
    const [plaidAccounts, setPlaidAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchCompleted, setFetchCompleted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const allAccounts = await getPlaidAccounts();
                const accountList = allAccounts.accounts.map(item => ({
                    name: item.name,
                    mask: item.mask,
                    available_balance: item.balances.available,
                    current_balance: item.balances.current,
                    account_type: item.subtype, 
                }));
                setPlaidAccounts(accountList);
            } catch (error) {
                console.error("Error fetching Plaid accounts:", error);
                // Handle error more gracefully (e.g., display an error message)
            } finally{
                setFetchCompleted(true);
                setIsLoading(false);
            }
        }
        fetchData();
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
        cursor: 'auto', 
    };

    return (
        <>
            {isLoading ? (
                <button style={NoDataOrLoading} disabled>Loading...</button>
            ) : plaidAccounts.length > 0 ? (
                <>
                    <CsvDownloadButton data={plaidAccounts} filename="account_data" style={buttonStyle}>
                        Export Account Data
                    </CsvDownloadButton>
                    <TransactionDataCSV rerender={fetchCompleted} />
                </>
            ) : (
                <button style={NoDataOrLoading} disabled>No Account Data</button>
            )}
        </>
    );
}

export default AccountDataCSV;
