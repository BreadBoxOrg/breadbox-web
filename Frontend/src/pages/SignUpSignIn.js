import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/BreadBox_Logo.png";

function SignUpSignIn() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Email:', email);
    };

    return (
        <>
            <div className='min-h-screen flex flex-col items-center justify-center bg-[#26292B]'>
                <img className="h-[168px] w-[168px] mb-8" src={logo} alt="BreadBox Logo" />
                <div className='text-white bg-gradient-to-b from-[#189172] to-[#26292B] flex flex-col items-center p-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 h-3/4 rounded-3xl'>
                    <h2 className="text-4xl sm:text-5xl mb-0 pt-12">Let's Get Started</h2>
                    <span className='text-lg sm:text-xl pt-2.5 pb-12 text-center'>Sign up to Breadbox to get started immediately</span>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                        <button className="flex flex-col items-center bg-[#0069d5] rounded-full w-[325px] h-[75px] text-white font-bold text-xl sm:text-2xl mb-4 p-2 hover:cursor-pointer">
                            <input 
                                className='w-1/2 h-1/4 text-center rounded-md'
                                type="email"
                                placeholder="Enter Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            Sign Up With Google
                        </button>
                    </form>
                    <span className="text-xl sm:text-2xl font-bold py-2.5">Or</span>
                    <Link to="/dashboard">
                        <button className='bg-[#1ADBA9] rounded-full w-[325px] h-[50px] text-white font-bold text-xl sm:text-2xl hover:cursor-pointer'>Sign In</button>
                    </Link>
                </div>
                <div className='text-white flex flex-col items-center mt-8 w-11/12 md:w-3/4'>
                    <ul className='flex justify-center space-x-10 font-bold text-sm sm:text-base'>
                        <li><a href="https://github.com/danbergeron3/Breadbox.git">About</a></li>
                        <li><a href="https://github.com/danbergeron3/Breadbox.git">Contact</a></li>
                        <li><a href="https://github.com/danbergeron3/Breadbox.git">Repo</a></li>
                    </ul>
                    <span className="mt-5 text-[#3E3F40] font-bold text-xs sm:text-sm">Made with love by the BreadBox Team - GUI 2 2024 Spring Project</span>
                </div>
            </div>
        </>
    );
}

export default SignUpSignIn;
