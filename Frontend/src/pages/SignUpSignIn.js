import React, { useState } from 'react';
import './SignUpSignIn.css';
import logo from "../images/BreadBox_Logo.png";
import { Link } from 'react-router-dom';

function SignUpSignIn(){

    const [email, setEmail] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission logic here
          console.log('Submitted Email:', email);
        };


    return(<>
    <body className='sign-up'>
        <img className="sign-up-page-logo" src={logo} alt="BreadBoxLogo"></img>
        <div className='sign-in-box'>
            <h2>Let's Get Started</h2>
            <span className='sign-up-prompt'>Sign up to Breadbox to get started immediately</span>
            <form onSubmit={handleSubmit}>
              <button className='sign-up-button' type="submit">
                <input className='sign-up-text-box'
                  type="email"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span>Sign Up With Google</span>
              </button>
            </form>
            <span className='or'>Or</span>
            <Link to="/dashboard">
                <button className='sign-in-button'>Sign In</button>
            </Link>
        </div>
        <div className='Footer'>
            <ul className='Links'>
                <li><a href="https://github.com/danbergeron3/Breadbox.git">About</a></li>
                <li><a href="https://github.com/danbergeron3/Breadbox.git">Contact</a></li>
                <li><a href="https://github.com/danbergeron3/Breadbox.git">Repo</a></li>
            </ul>
            <span>Made with love by the BreadBox Team - GUI 2 2024 Spring Project</span>
        </div>
    </body>
    </>);
}

export default SignUpSignIn