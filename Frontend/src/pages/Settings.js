import React, { useState } from 'react';
import Popup from 'reactjs-popup';
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
import ProfilePicChange from '../components/ProfilePic.jsx';

const Settings = () =>{

    const [selectedNotificationWhen, setNotificationWhen] = useState('');

    const NotiWhenOptions = [
        { value: 'low-funds', label: 'Low Funds'},
        { value: 'deposited-funds', label: 'Deposited Funds'},
    ];

    const [selectedNotificationBy, setNotificationBy] = useState('');

    const NotificationBy = [
        { value: 'email', label: 'Email'},
        { value: 'phone-number', label: 'Phone Number'},
    ];

    const [inputValue, setInputValue] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        let message = "";
        if (selectedNotificationBy === 'email') {
            // Simulate email submission
            message = `Email Submitted: ${inputValue}`;
        } else if (selectedNotificationBy === 'phone-number') {
            // Simulate phone number submission
            message = `Phone Number Submitted: ${inputValue}`;
        }
        setPopupMessage(message);
        setPopupOpen(true);
    };

    const handleNotificationByChange = (selectedOption) => {
        setNotificationBy(selectedOption.value);
    };

    const handleNotificationWhenChange = (selectedOption) => {
        setNotificationWhen(selectedOption.value);
    };

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
    const [profilePic, setProfilePic] = useState(sessionStorage.getItem('profilePic') || ProfilePic);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

     const handleSaveProfile = () => {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('profilePic', profilePic);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Reset the form fields to the current sessionStorage values
        setFirstName(sessionStorage.getItem('firstName') || '');
        setLastName(sessionStorage.getItem('lastName') || '');
        setEmail(sessionStorage.getItem('email') || '');
        setProfilePic(sessionStorage.getItem('profilePic') || '');
        setIsEditing(false);
    };

     // Retrieve profile pic from sessionStorage

    const handleProfilePicChange = (newProfilePic) => {
        setProfilePic(newProfilePic); // Update profile pic in state
    };

    return (
        <>
            <div className="overflow-x-auto px-4 sm:px-10 sm:ml-[275px]">
                <NavbarLayout />
                <div className="py-3 text-[#1ADBA9] text-2xl sm:text-4xl mb-0 "><h1>Settings</h1></div>
                <div className='fixed top-4 right-4 sm:absolute sm:right-0 sm:mr-10'>
                    <Link to="/">
                        <button className="w-40 h-8 sm:w-50 sm:h-10 text-white bg-[#651819] border-none rounded-full font-bold text-sm sm:text-lg cursor-pointer">Log Out</button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    <div className="text-white font-bold">
                        <div className="bg-[#141516] rounded-2xl mb-6 p-4">
                            <h2 className="text-xl mb-4">
                                Account
                                {isEditing ? (
                                    <>
                                        <button className='ml-auto block bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold' onClick={handleSaveProfile}>Save</button>
                                        <button className='bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold ml-2' onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <button className='ml-auto block bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold' onClick={handleEditProfile}>Edit Profile</button>
                                )}
                            </h2>
                            <ProfilePicChange profilePic={profilePic} onProfilePicChange={handleProfilePicChange} isEditing={isEditing}/>
                            <div className='flex flex-col mb-4'>
                                <span>First Name</span>
                                <ProfileInfoBox text={firstName} isEditable={isEditing} onChangeText={setFirstName}/>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <span>Last Name</span>
                                <ProfileInfoBox text={lastName} isEditable={isEditing} onChangeText={setLastName}/>
                            </div>
                            <div className='flex flex-col'>
                                <span>Email</span>
                                <ProfileInfoBox text={email} isEditable={isEditing} onChangeText={setEmail}/>
                            </div>
                        </div>
                        <div className="bg-[#141516] rounded-2xl p-4">
                            <span className='text-xl'>Linked Accounts</span>
                            <LinkComponent />
                            <AccountList />
                        </div>
                    </div>
                    <div className="bg-[#141516] rounded-2xl p-4 mt-6 sm:mt-0">
                        <div className="mb-6">
                            <h2 className="text-xl mb-4">General</h2>
                            <ul className="list-none">
                                <li><AccountDataCSV /><TransactionDataCSV /></li>
                            </ul>
                        </div>
                        <div className="notifications">
                            <h2 className="text-xl mb-4">Notifications</h2>
                            <span>Notify Me When...</span>
                            <div className='flex flex-col sm:flex-row justify-between mt-4'>
                                <NotificationOptions 
                                    value={selectedNotificationWhen}
                                    onChange={handleNotificationWhenChange}
                                    options={NotiWhenOptions}
                                    />
                                    <NotificationOptions 
                                        value={selectedNotificationBy}
                                        onChange={handleNotificationByChange}
                                        options={NotificationBy}
                                    />
                                </div>
                                <div className='mt-4'>
                                    {(selectedNotificationBy !== '' && selectedNotificationWhen !== '') && (
                                        <div className='flex items-center justify-center gap-2'>
                                            <input 
                                                className='text-center h-10 sm:h-12 rounded-full border px-4'
                                                type={selectedNotificationBy === 'email' ? 'email' : 'tel'}
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                placeholder={
                                                    selectedNotificationBy === 'email'
                                                    ? 'Enter Email'
                                                    : 'Enter Phone Number'
                                                }
                                            />
                                            <button className='bg-[#1ADBA9] text-white rounded-full px-3 py-1 font-bold' onClick={handleSubmit}>Submit</button>
                                        </div>
                                    )}
                                    <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                                        {popupMessage}
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

export default Settings;