/*
    File: ExportAccountsCSV.jsx
    Description: Button Component that allows users to download their account data as a CSV
*/

import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv';
import { getPlaidAccounts } from "../utils/http.js";
import TransactionDataCSV from "./ExportTranscationsCSV.jsx";
import { useTranslation } from 'react-i18next';

function AccountDataCSV({ rerender }) {
    const [plaidAccounts, setPlaidAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchCompleted, setFetchCompleted] = useState(false);


    //Fetch Plaid Accounts that are linked
    const { t } = useTranslation();

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

    //Styling for the Button
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

    //Different styling when button is loading or no data is found
    const NoDataOrLoading = {
        ...buttonStyle,
        opacity: 0.5,
        cursor: 'auto', 
    };

    return (
        <>
            {isLoading ? (
                <button style={NoDataOrLoading} disabled>{t('settings.export-loading')}</button>
            ) : plaidAccounts.length > 0 ? (
                <>
                    <CsvDownloadButton data={plaidAccounts} filename="account_data" style={buttonStyle}>
                        {t('settings.export-account-csv')}
                    </CsvDownloadButton>
                    <TransactionDataCSV rerender={fetchCompleted} />
                </>
            ) : (
                <button style={NoDataOrLoading} disabled>{t('settings.export-no-account-data')}</button>
            )}
        </>
    );
}

export default AccountDataCSV;
