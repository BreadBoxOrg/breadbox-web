/*
  * File: 
    *LinkedAccountsList.jsx

  * Description: 
    * Displays a list of linked bank accounts.
    * Allows user to remove linked bank accounts.
    * Uses Plaid API to fetch linked bank accounts.
  * 
*/


import React, { useState, useEffect } from 'react';
import { getPlaidAccounts } from '../utils/http.js';

function AccountList({ rerender }) {
    const [accounts, setAccounts] = useState([]);
    //const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    useEffect(() => {
        async function fetchAccounts() {
            try {
                // Fetch accounts using getPlaidAccounts function
                const allAccounts = await getPlaidAccounts();
                const accountList = allAccounts.accounts.map(item => ({
                    id: item.account_id,
                    name: item.name,
                    mask: item.mask
                }));
                // Update accounts state with fetched accounts
                setAccounts(accountList);
            } catch (error) {
                // Log error if fetching accounts fails
                console.error('Error fetching accounts:', error);
            }
        }
        fetchAccounts();
    }, [rerender]);

    /*
    const handleRemoveAccount = (removeIndex) => {
        setConfirmDeleteIndex(removeIndex);
    };

    const handleConfirmDelete = () => {
        const updatedAccounts = accounts.filter((_, i) => i !== confirmDeleteIndex);
        setAccounts(updatedAccounts);
        setConfirmDeleteIndex(null);
    }

    const handleCancelDelete = () => {
        setConfirmDeleteIndex(null);
    };
    */

    return (
        <div>
            <ul className='linkedBankAccounts'>
                {accounts.map((account, index) => (
                    <li key={account.id}>
                        <span className='account-details'>
                            {account.name} - {account.mask}
                        </span>
                        {/*<ClearIcon className='remove-bank' onClick={() => handleRemoveAccount(index)} />*/}
                    </li>
                ))}
                {/*
                <Popup open={confirmDeleteIndex !== null} onClose={handleCancelDelete}>
                    <div className='delete-account-pop-up'>
                        <p>Are you sure you want to delete this account?</p>
                        <button className='pop-up-button-yes' onClick={handleConfirmDelete}>Yes</button>
                        <button className='pop-up-button-no' onClick={handleCancelDelete}>No</button>
                    </div>
                </Popup>
                */}
            </ul>
        </div>
    );
}

export default AccountList;

