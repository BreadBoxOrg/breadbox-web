import React, { useState, useEffect } from 'react';
import { getPlaidAccounts } from '../utils/http.js';
import Popup from "reactjs-popup";
import ClearIcon from '@mui/icons-material/Clear';

function AccountList({ rerender }) {
    const [accounts, setAccounts] = useState([]);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const allAccounts = await getPlaidAccounts();
                const accountList = allAccounts.accounts.map(item => ({
                    id: item.account_id,
                    name: item.name,
                    mask: item.mask
                }));
                setAccounts(accountList);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        }
        fetchAccounts();
    }, [rerender]);

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

    return (
        <div>
            <ul className='linkedBankAccounts'>
                {accounts.map((account, index) => (
                    <li key={account.id}>
                        <span className='account-details'>
                            {account.name} - {account.mask}
                        </span>
                        <ClearIcon className='remove-bank' onClick={() => handleRemoveAccount(index)} />
                    </li>
                ))}
                <Popup open={confirmDeleteIndex !== null} onClose={handleCancelDelete}>
                    <div className='delete-account-pop-up'>
                        <p>Are you sure you want to delete this account?</p>
                        <button className='pop-up-button-yes' onClick={handleConfirmDelete}>Yes</button>
                        <button className='pop-up-button-no' onClick={handleCancelDelete}>No</button>
                    </div>
                </Popup>
            </ul>
        </div>
    );
}

export default AccountList;

