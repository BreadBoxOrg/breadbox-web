import React from 'react';
import{Link, useLocation} from 'react-router-dom';
import './SideBar.css'
import Logo from '../images/BreadBox_Logo.png';
import placeholder from '../images/placeholder.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import { userInfo } from './mock_data/mockData';

const NavbarLayout = () =>{
    
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

    return(
        <div className='NavBar'>
            <div className='logo-container'>
                <Link to="/dashboard">
                    <img className='side-bar-logo' src={Logo} alt="Logo"></img>
                </Link>
            </div>
            <ul>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <AssessmentIcon className="NavBarIcons" />
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={location.pathname === '/expenses' ? 'active' : ''}>
                    <ShoppingCartIcon className="NavBarIcons"/>
                    <Link to="/expenses">Expenses</Link>
                </li>
                <li className={location.pathname === '/finances' ? 'active' : ''}>
                    <DescriptionIcon className="NavBarIcons"/>
                    <Link to="/finances">Finances</Link>
                </li>
                <li className={location.pathname === '/settings' ? 'active' : ''}>
                    <SettingsIcon className="NavBarIcons"/>
                    <Link to="/settings">Settings</Link>    
                </li>
            </ul>
            <div className='NavbarFooter'>
                <img className='footer-profilePic' src={ProfilePic} alt='placeholder'></img>
                <h3>{FullName}</h3>
                <p>{Email}</p>
            </div>
        </div>
        
        );
}

export default NavbarLayout