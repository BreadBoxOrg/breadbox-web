import React, { useState, useEffect } from 'react';
import NavbarLayout from "../components/SideBar";
import './Settings.css';
import ProfilePic from "../images/placeholder.jpg";
import PlaidLogo from "../images/Plaid_Logo.png"
import { Link } from 'react-router-dom';
import NotificationOptions from '../components/NotificationOptions.jsx';
import ProfileInfoBox from '../components/ProfileInfoBox.jsx';
import { userInfo } from '../components/mock_data/mockData.js';
import { userlinkedAccounts } from '../components/mock_data/mockData.js';
import ClearIcon from '@mui/icons-material/Clear';
import Popup from "reactjs-popup";

const Settings = () =>{

    const [selectedNotificationWhen, setNotificationWhen] = useState('');

    const NotiWhenOptions = [
        { value: 'low-funds', label: 'Low Funds'},
        { value: 'deposited-funds', label: 'Deposited Funds'},
        { value: 'other', label: 'Other'},
    ];

    const [selectedNotificationBy, setNotificationBy] = useState('');

    const NotificationBy = [
        { value: 'email', label: 'Email'},
        { value: 'phone-number', label: 'Phone Number'},
    ];

    const [accounts, setAccounts] = useState([]);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
    
    useEffect(() => {
        setAccounts(userlinkedAccounts);
    }, []);

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
    }

    return(<>
            <body className="settings">
                <NavbarLayout />
                <div className="SettingsHeader"><h1>Settings</h1></div>
                <div className='button-layout'>
                    <Link to="/">
                        <button className="log-out-button">Log Out</button>
                    </Link>
                </div>
                <body className="settingslayout">
                    <div className="left-column">
                        <div className="account">
                            <h2>Account</h2>
                            <img className="settings-profilePic" src={ProfilePic} alt='placeholder'></img>
                            <div className='profile-firstName'>
                                <span>First Name</span>
                                <ProfileInfoBox text={userInfo.find(item => item.firstName)?.firstName} />
                            </div>
                            <div className='profile-lastName'>
                                <span>Last Name</span>
                                <ProfileInfoBox text={userInfo.find(item => item.lastName)?.lastName} />
                            </div>
                            <div className='profile-email'>
                                <span>Email</span>
                                <ProfileInfoBox text={userInfo.find(item => item.email)?.email} />
                            </div>    
                        </div>
                        <div className="linkedaccounts">
                            <h2>Linked Accounts
                                <button className='plaid-button'>
                                    <img alt="Plaid Logo" src={PlaidLogo}></img>
                                    Link Your Account With Plaid
                                </button>
                            </h2>
                            <ul className='linkedBankAccounts'>
                                {accounts.map((bank, index) => (
                                <li key={index}>
                                    <span className='bank-account-details'>
                                        {bank.name} - {bank.lastFourDigits}
                                    </span>
                                    <ClearIcon className='remove-bank' 
                                    onClick={() => handleRemoveAccount(index)} />
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
                    </div>
                    <div className="right-column">
                        <div className="general">
                            <h2>General</h2>
                                <ul>
                                    <li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>
                                    <li>Option 4</li>
                                </ul>
                            <div className="notifications">
                                <h2>Notifications</h2>
                                <span>Notify Me When...</span>
                                <div className='notification-selection-options'>
                                    <NotificationOptions 
                                        value={selectedNotificationWhen}
                                        onChange={setNotificationWhen}
                                        options={NotiWhenOptions}
                                        />
                                    <NotificationOptions 
                                        value={selectedNotificationBy}
                                        onChange={setNotificationBy}
                                        options={NotificationBy}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </body>
            </>);
}

export default Settings;