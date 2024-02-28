import React from 'react';
import{Link, useLocation} from 'react-router-dom';
import './SideBar.css'
import Logo from '../images/BreadBox_Logo.png';
import placeholder from '../images/placeholder.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import  ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';


const NavbarLayout = () =>{
    
    const location = useLocation(); 
    
    return(
        <div className='NavBar'>
            <img className='side-bar-logo' src={Logo} alt="Logo"></img>
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
                <img className='profilePic' src={placeholder} alt='placeholder'></img>
                <h3>BreadboxTest</h3>
                <p>BreadBox@gmail.com</p>
            </div>
        </div>
        
        );
}

export default NavbarLayout