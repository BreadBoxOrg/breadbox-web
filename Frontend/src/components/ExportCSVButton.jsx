import React, { useState, useEffect } from "react";
import CsvDownloadButton from 'react-json-to-csv'
import { getPlaidAccounts } from "../utils/http.js";

function ExportToCSVButton () {

    const [plaidAccounts, setPlaidAccounts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const allAccounts = await getPlaidAccounts();
                const accountList = allAccounts.accounts.map(item => ({
                    id: item.account_id,
                    name: item.name,
                    mask: item.mask
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

    if (plaidAccounts === null) {
        return <div>Loading...</div>;
    }

    return(<><CsvDownloadButton data={plaidAccounts} style={buttonStyle}>Export Data To CSV</CsvDownloadButton></>);
}

export default ExportToCSVButton;