import React, { useState } from 'react';
import NavbarLayout from "../components/SideBar";
import './Settings.css';
import ProfilePic from "../images/placeholder.jpg";
import { Link } from 'react-router-dom';
import NotificationOptions from '../components/NotificationOptions.jsx';
import ProfileInfoBox from '../components/ProfileInfoBox.jsx';
import { userInfo } from '../components/mock_data/mockData.js';
//import { userlinkedAccounts } from '../components/mock_data/mockData.js';
import LinkComponent from '../components/LinkComponent.jsx';
import AccountList from '../components/LinkedAccountsList.jsx';
import AccountDataCSV from '../components/ExportAccountsCSV.jsx';
import TransactionDataCSV from '../components/ExportTranscationsCSV.jsx';

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

    /*const [accounts, setAccounts] = useState([]);
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
    */

    const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName') || userInfo.find(item => item.firstName)?.firstName);
    const [lastName, setLastName] = useState(sessionStorage.getItem('lastName') || userInfo.find(item => item.lastName)?.lastName);
    const [email, setEmail] = useState(sessionStorage.getItem('email') || userInfo.find(item => item.email)?.email);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

     const handleSaveProfile = () => {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('email', email);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Reset the form fields to the current sessionStorage values
        setFirstName(sessionStorage.getItem('firstName') || '');
        setLastName(sessionStorage.getItem('lastName') || '');
        setEmail(sessionStorage.getItem('email') || '');
        setIsEditing(false);
    };

    return(<>
            <body className="settings">
                <NavbarLayout />
                <div className="SettingsHeader"><h1>Settings</h1></div>
                <div className='button-layout'>
                    <Link to="/">
                        <button className="log-out-button">Log Out</button>
                    </Link>
                </div>
                <div className="settingslayout">
                    <div className="left-column">
                        <div className="account">
                            <h2>
                                Account
                                {isEditing ? (
                                    <>
                                        <button className='account-edit-save' onClick={handleSaveProfile}>Save</button>
                                        <button className='account-edit-cancel' onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                    ) : (
                                    <button className='account-edit-profile' onClick={handleEditProfile}>Edit Profile</button>
                                    )}
                            </h2>
                            <img className="settings-profilePic" src={ProfilePic} alt='placeholder'></img>
                            <div className='profile-firstName'>
                                <span>First Name</span>
                                {isEditing ? (
                                    <input className='account-input-box'
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    ) : (
                                    <ProfileInfoBox text={firstName} />
                                    )}
                            </div>
                            <div className='profile-lastName'>
                                <span>Last Name</span>
                                {isEditing ? (
                                    <input className='account-input-box'
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    ) : (
                                    <ProfileInfoBox text={lastName} />
                                    )}
                            </div>
                            <div className='profile-email'>
                                <span>Email</span>
                                {isEditing ? (
                                    <input className='account-input-box'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    ) : (
                                    <ProfileInfoBox text={email} />
                                    )}
                            </div>    
                        </div>
                        <div className="linkedaccounts">
                            <span className='linked-accounts-header'>Linked Accounts</span>
                                {/* <button className='plaid-button'>
                                    <img alt="Plaid Logo" src={PlaidLogo}></img>
                                    Link Your Account With Plaid
                                </button> */}
                            <LinkComponent/>
                            {/*
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
                            */}
                            <AccountList />
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="general">
                            <h2>General</h2>
                                <ul>
                                    {/*<li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>*/}
                                    <li><AccountDataCSV /><TransactionDataCSV /></li>
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
                </div>
            </body>
            </>);
}

export default Settings;