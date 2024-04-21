/*
  * File: 
    *SideBar.js

  * Description: 
    * Allow Users to Navigate BreadBox Pages
    * Hovering Over Navbar footer will allow users to log out
    * 4 Total Pages: Dashboard, Expense, Finances, Settings 
  * 
*/

import React from 'react';
import React, { useState } from 'react';
import{Link, useLocation} from 'react-router-dom';
import './SideBar.css'
import Logo from '../images/BreadBox_Logo.png';
import placeholder from '../images/placeholder.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import { userInfo } from './mock_data/mockData';
import { useTranslation } from 'react-i18next';

const NavbarLayout = () =>{
    
    const { t } = useTranslation();
    const location = useLocation(); 

    let FullName = sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
    let Email = sessionStorage.getItem('email');
    let ProfilePic = sessionStorage.getItem('profilePic');

    if(!sessionStorage.getItem('firstName') || !sessionStorage.getItem('lastName')){
        FullName = userInfo.find(item => item.firstName)?.firstName + ' ' + userInfo.find(item => item.lastName)?.lastName;    
    }
    if(!Email){
        Email = userInfo.find(item => item.email)?.email;
    }
    if(!sessionStorage.getItem('profilePic')){
        ProfilePic = placeholder;
    }

    const [isHovered, setIsHovered] = useState(false);

    // Event handlers
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return(
        <div className='NavBar'>
            <div className='logo-container'>
                <Link to="/dashboard">
                    <img className='side-bar-logo' src={Logo} alt="Logo"></img>
                </Link>
            </div>
            <ul>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <Link to="/dashboard">
                        <AssessmentIcon className="NavBarIcons" />
                        {t('navbar.dashboard')}
                    </Link>
                </li>
                <li className={location.pathname === '/expenses' ? 'active' : ''}>
                    <Link to="/expenses">
                        <ShoppingCartIcon className="NavBarIcons"/>
                        {t('navbar.expenses')}
                    </Link>
                </li>
                <li className={location.pathname === '/finances' ? 'active' : ''}>
                    <Link to="/finances">
                        <DescriptionIcon className="NavBarIcons"/>
                        {t('navbar.finances')}
                    </Link>
                </li>
                <li className={location.pathname === '/settings' ? 'active' : ''}>
                    <Link to="/settings">
                        <SettingsIcon className="NavBarIcons"/>
                        {t('navbar.settings')}
                    </Link>    
                </li>
            </ul>
            <div
                className={`NavbarFooter ${isHovered ? 'expanded' : ''}`} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                <img className='footer-profilePic' src={ProfilePic} alt='placeholder'></img>
                <h3>{FullName}</h3>
                <p>{Email}</p>
                <div className="flex items-center justify-center mt-4">
                    <Link to="/">
                        <button className="w-40 h-8 text-white bg-[#651819] border-none rounded-full font-bold text-sm cursor-pointer sm:w-50 sm:h-10 sm:text-lg">
                            {t('settings.log-out')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        
        );
}

export default NavbarLayout