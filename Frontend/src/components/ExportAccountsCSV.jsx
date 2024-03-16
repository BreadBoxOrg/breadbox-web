import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv'
import { getPlaidAccounts } from "../utils/http.js";

function AccountDataCSV () {

    const [plaidAccounts, setPlaidAccounts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const allAccounts = await getPlaidAccounts();
                const accountList = allAccounts.accounts.map(item => ({
                    name: item.name,
                    mask: item.mask,
                    avaiable_balance: item.balances.available,
                    current_balance: item.balances.current,
                    account_type: item.subtype, 
                }));
                setPlaidAccounts(accountList);
            } catch (error) {
                console.error("Error fetching Plaid accounts:", error);
            }
        }
        fetchData();
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
        textAlign: 'center'
    };

    return(<>
        {plaidAccounts.length > 0 && (
            <CsvDownloadButton data={plaidAccounts} filename="account_data" style={buttonStyle}>
                Export Account Data
            </CsvDownloadButton>
        )}
    </>);
}

export default AccountDataCSV;