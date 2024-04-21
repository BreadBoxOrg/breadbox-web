/*
File: Settings.js
Description: Layout of Settings Page.
Functions: Edit Profiles, Linked Accounts, Export Data
*/

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import NavbarLayout from "../components/SideBar";
import './Settings.css';
import ProfilePic from "../images/placeholder.jpg";
import { Link } from 'react-router-dom';
import NotificationOptions from '../components/NotificationOptions.jsx';
import ProfileInfoBox from '../components/ProfileInfoBox.jsx';
import { userInfo } from '../components/mock_data/mockData.js';
import LinkComponent from '../components/LinkComponent.jsx';
import AccountList from '../components/LinkedAccountsList.jsx';
import AccountDataCSV from '../components/ExportAccountsCSV.jsx';
import ProfilePicChange from '../components/ProfilePic.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector.jsx';

const Settings = () =>{

    // State for re-rendering linked accounts list
    const { t } = useTranslation();

    const [rerenderSettings, setRerenderSettings] = useState(false);

    const [selectedNotificationWhen, setNotificationWhen] = useState('');

    const NotiWhenOptions = [
        { value: 'low-funds', label: t('settings.notify-low-funds')},
        { value: 'deposited-funds', label: t('settings.notify-deposited-funds')},
    ];

    const [selectedNotificationBy, setNotificationBy] = useState('');

    const NotificationBy = [
        { value: 'email', label: t('settings.email')},
        { value: 'phone-number', label: t('settings.notify-phone-number')},
    ];

    // State for input value and popup message
    const [inputValue, setInputValue] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle form submission for notification settings
    const handleSubmit = () => {
        let message = "";
        if (selectedNotificationBy === 'email') {
            // Simulate email submission
            message = `${t('settings.email-submit')}: ${inputValue}`;
        } else if (selectedNotificationBy === 'phone-number') {
            // Simulate phone number submission
            message = `${t('settings.phone-submit')}: ${inputValue}`;
        }
        setPopupMessage(message);
        setPopupOpen(true);
    };

    // Handle changes to notification options
    const handleNotificationByChange = (selectedOption) => {
        setNotificationBy(selectedOption.value);
    };

    const handleNotificationWhenChange = (selectedOption) => {
        setNotificationWhen(selectedOption.value);
    };

    const handleAccountsRerender = () => {
        setRerenderSettings(prevState => !prevState);
    };

    // State and functions for editing user profile
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
            {/* Main settings page layout */}
            <div className="pt-48 overflow-x-auto px-4 sm:px-10 sm:ml-[275px] lg:pt-12">
                <NavbarLayout />
                {/* Header with title and logout button */}
                <div className="flex justify-between items-center text-[#1ADBA9] text-2xl sm:text-4xl mb-0 lg:mb-8">
                    <h1 className="font-bold text-[#1ADBA9] text-xl md:text-3xl">{t('settings.settings-header')}</h1>
                    <div className="py-3 sm:py-0">
                        <Link to="/">
                            <button className="w-40 h-8 text-white bg-[#651819] border-none rounded-full font-bold text-sm cursor-pointer sm:w-50 sm:h-10 sm:text-lg">
                                {t('settings.log-out')}
                            </button>
                        </Link>
                    </div>
                </div>
                {/* This is your main settings content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    <div className="text-white font-bold">
                        {/* Account settings */}
                        <div className="bg-[#141516] rounded-2xl mb-6 p-4">
                            <h2 className="text-xl mb-4">
                                {t('settings.account-header')}
                                {isEditing ? (
                                    <>
                                        <div className="flex">
                                            <button className='ml-auto block bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold' onClick={handleSaveProfile}>
                                                {t('settings.save-button')}
                                            </button>
                                            <button className='bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold ml-2' onClick={handleCancelEdit}>
                                                {t('settings.cancel-button')}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button className='ml-auto block bg-[#109f7a] text-white rounded-lg px-3 py-1 font-bold' onClick={handleEditProfile}>
                                        {t('settings.edit-profile')}
                                    </button>
                                )}
                            </h2>
                            {/* Profile picture and info boxes */}
                            <ProfilePicChange profilePic={profilePic} onProfilePicChange={handleProfilePicChange} isEditing={isEditing}/>
                            <div className='flex flex-col mb-4'>
                                <span>{t('settings.first-name')}</span>
                                <ProfileInfoBox text={firstName} isEditable={isEditing} onChangeText={setFirstName}/>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <span>{t('settings.last-name')}</span>
                                <ProfileInfoBox text={lastName} isEditable={isEditing} onChangeText={setLastName}/>
                            </div>
                            <div className='flex flex-col'>
                                <span>{t('settings.email')}</span>
                                <ProfileInfoBox text={email} isEditable={isEditing} onChangeText={setEmail}/>
                            </div>
                        </div>
                        {/* Linked Accounts Section */}
                        <div className="bg-[#141516] rounded-2xl p-4">
                            <span className='text-xl'>{t('settings.linked-accounts')}</span>
                            <LinkComponent onSuccess={handleAccountsRerender}/>
                            <AccountList rerender={rerenderSettings}/>
                        </div>
                    </div>
                    {/* General settings */}
                    <div className="bg-[#141516] rounded-2xl p-4 mt-6 sm:mt-0">
                        <div className="mb-6">
                            <h2 className=" font-bold text-white text-xl mb-4">{t('settings.general-header')}</h2>
                            <ul className="list-none flex flex-col items-center">
                                {/* Export account data */}
                                <li className='flex items-center gap-10'>
                                    <AccountDataCSV rerender={rerenderSettings}/>
                                </li>
                            </ul>
                        </div>
                        {/* Notification Settings */}
                        <div className="notifications">
                            <h2 className=" font-bold text-white text-xl mb-4">{t('settings.notifications-header')}</h2>
                            <span>{t('settings.notification-notify')}</span>
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
                                                    ? t('settings.enter-email')
                                                    : t('settings.enter-phone')
                                                }
                                            />
                                            <button className='bg-[#1ADBA9] text-white rounded-full px-3 py-1 font-bold' onClick={handleSubmit}>{t('settings.noti-submit')}</button>
                                        </div>
                                    )}
                                    {/* Popup for notification submission confirmation */}
                                    <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                                        {popupMessage}
                                    </Popup>
                                </div>
                                <h2 className=" font-bold text-white text-xl mb-4">{t('settings.select-language')}</h2>
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

export default Settings;