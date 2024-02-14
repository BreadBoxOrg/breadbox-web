import React from 'react';
import{Link} from 'react-router-dom';
import './SideBar.css'
import Logo from '../images/BreadBox_Logo.png';
import placeholder from '../images/placeholder.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import  ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';

const NavbarLayout = () =>{
    return(
        <div className='NavBar'>
            <img className='logo' src={Logo} alt="Logo"></img>
            <ul>
                <li>
                    <AssessmentIcon />
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <ShoppingCartIcon />
                    <Link to="/expenses">Expenses</Link>
                </li>
                <li>
                    <DescriptionIcon />
                    <Link to="/finances">Finances</Link>
                </li>
                <li>
                    <SettingsIcon />
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