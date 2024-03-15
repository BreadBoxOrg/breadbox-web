import React, { useState, useEffect } from 'react';
import { getPlaidAccounts } from '../utils/http';
import Popup from "reactjs-popup";
import ClearIcon from '@mui/icons-material/Clear';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);


    const handleRemoveAccount = (removeIndex) => {
        setConfirmDeleteIndex(removeIndex);
    };

    const handleConfirmDelete = () => {
        const updatedAccounts = accounts.filter((_, i) => i !== confirmDeleteIndex);
        console.log(confirmDeleteIndex);
        setAccounts(updatedAccounts);
        setConfirmDeleteIndex(null);
    }
    const handleCancelDelete = () => {
        setConfirmDeleteIndex(null);
    }

    useEffect(() => {
        async function fetchAccounts() {
          const promise = getPlaidAccounts();
          promise.then((allAccounts) => { 
            // create local transaction object list
            let AccountDisplayList = [];
            //console.log(transactions.recuring_cost);
            // loop through transactions.recuring_costs
            allAccounts.accounts.forEach( item => {
              // create temp object add name and amount 
              const displayItem = {
                name: item.name,
                mask: item.mask
              };
              AccountDisplayList.push(displayItem);
            });
    
            setAccounts(AccountDisplayList);
          }).catch((err) => { console.log(err)});
    
        }
        fetchAccounts();
      }, []);

    return (
        <div>
            <ul className='linkedBankAccounts'>
                {accounts.map(account => (
                    <li key={account.id}>
                        <span className='account-details'>
                            {account.name} - {account.mask}
                        </span>
                        <ClearIcon className='remove-bank' 
                        onClick={() => handleRemoveAccount(account.id)} />
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