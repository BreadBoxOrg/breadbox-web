import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/BreadBox_Logo.png";
import { useTranslation } from 'react-i18next';
import PickLanguageSignIn from '../components/PickLanguageSignIn.jsx';

function SignUpSignIn() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Email:', email);
    };

    const { t } = useTranslation();

    return (
        <>
            <div className='min-h-screen flex flex-col items-center justify-center bg-[#26292B]'>
                <img className="h-[168px] w-[168px] mb-8" src={logo} alt="BreadBox Logo" />
                <div className='text-white bg-gradient-to-b from-[#189172] to-[#26292B] flex flex-col items-center p-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 h-3/4 rounded-3xl'>
                    <h2 className="text-4xl sm:text-5xl mb-0 pt-12">{t('signup_login.started')}</h2>
                    <span className='text-lg sm:text-xl pt-2.5 pb-12 text-center'>{t('signup_login.signup-msg')}</span>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                        <button className="flex flex-col items-center bg-[#0069d5] rounded-full w-[325px] h-[75px] text-white font-bold text-xl sm:text-2xl mb-4 p-2 hover:cursor-pointer">
                            <input 
                                className='w-3/5 h-1/3 text-center rounded-full'
                                type="email"
                                placeholder={`${t('signup_login.enter-email')}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ fontSize: '0.7em', color: 'black' }}
                            />
                            {t('signup_login.google')}
                        </button>
                    </form>
                    <span className="text-xl sm:text-2xl font-bold py-2.5">{t('signup_login.or')}</span>
                    <Link to="/dashboard">
                        <button className='bg-[#109f7a] rounded-full w-[325px] h-[50px] text-white font-bold text-xl sm:text-2xl hover:cursor-pointer'>{t('signup_login.sign-in')}</button>
                    </Link>
                </div>
                <div className='text-white flex flex-col items-center mt-8 w-11/12 md:w-3/4'>
                    <ul className='grid grid-cols-3 gap-10 font-bold text-sm sm:text-base'>
                        <li className="flex justify-center items-center"><a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.about')}</a></li>
                        <li className="flex justify-center items-center"><a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.contact')}</a></li>
                        <li className="flex justify-center items-center"><a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.repo')}</a></li>
                    </ul>
                    <span className="mt-5 text-[#3E3F40] font-bold text-xs sm:text-sm">{t('signup_login.footer')}</span>
                </div>
            </div>
            <div className="absolute bottom-10 right-10">
                <PickLanguageSignIn />
            </div>
        </>
    );
}

export default SignUpSignIn;
