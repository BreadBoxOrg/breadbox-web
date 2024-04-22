/*
File: SignUpSignIn.js
Description: Page for Logging In and Signing Up
*/

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
      {/* Layout of Sign In Page */}
      <div className='min-h-screen bg-[#26292B] text-white'>
        <header className="hero relative pt-24 -mt-24 bg-gradient-to-br from-gray-900/50 via-navy-900/50 to-navy-950/50">
          <div className="relative grid lg:grid-cols-1 gap-10 sm:gap-16 lg:gap-20 items-center container mx-auto px-4 sm:px-6 lg:px-8 py-9 md:py-16 lg:py-24 xl:pt-40 xl:pb-32">
            <div className="flex flex-col items-center drop-shadow-lg">
              <img src={logo} alt="BreadBox Logo" className="h-40 w-40 mb-8" />
              <h1 className="font-heading text-balance text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight md:leading-[1.1] lg:leading-[1.1] text-center">
                <span className="block text-[#189172] bg-gradient-to-br from-[#189172] to-[#26292B]" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t('signup_login.started')}
                </span>
                {t('signup_login.signup-msg')}
              </h1>
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
                <button className='bg-[#109f7a] rounded-full w-[325px] h-[50px] text-white font-bold text-xl sm:text-2xl hover:cursor-pointer'>
                  {t('signup_login.sign-in')}
                </button>
              </Link>
            </div>
          </div>
        </header>

        <section className="relative py-16 lg:py-24 xl:py-32 px-6 sm:px-8 lg:px-16 bg-white bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10">
          <div className="container mx-auto">
            <div className="grid gap-8 lg:gap-12 xl:gap-16 items-center lg:text-center">
              <div>
                <header className="max-w-xl xl:max-w-2xl lg:mx-auto space-y-4">
                  <h2 className="font-heading text-balance text-2xl md:text-3xl lg:text-4xl text-[#26292B]">
                    {t('signup_login.features-title')}
                  </h2>
                  <p className="text-lg xl:text-xl text-[#26292B]">
                    {t('signup_login.features-description')}
                  </p>
                </header>
              </div>
              <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <li className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
                    <div className="bg-gradient-to-br from-[#189172] to-[#26292B] rounded-full p-4 mb-4">
                      {/* Add an icon or image for the feature */}
                    </div>
                    <h3 className="font-heading text-xl mb-2 text-[#26292B]">
                      {t('signup_login.feature1-title')}
                    </h3>
                    <p className="text-[#26292B] text-center">
                      {t('signup_login.feature1-description')}
                    </p>
                  </li>
                  <li className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
                    <div className="bg-gradient-to-br from-[#189172] to-[#26292B] rounded-full p-4 mb-4">
                      {/* Add an icon or image for the feature */}
                    </div>
                    <h3 className="font-heading text-xl mb-2 text-[#26292B]">
                      {t('signup_login.feature2-title')}
                    </h3>
                    <p className="text-[#26292B] text-center">
                      {t('signup_login.feature2-description')}
                    </p>
                  </li>
                  <li className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
                    <div className="bg-gradient-to-br from-[#189172] to-[#26292B] rounded-full p-4 mb-4">
                      {/* Add an icon or image for the feature */}
                    </div>
                    <h3 className="font-heading text-xl mb-2 text-[#26292B]">
                      {t('signup_login.feature3-title')}
                    </h3>
                    <p className="text-[#26292B] text-center">
                      {t('signup_login.feature3-description')}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 lg:py-24 xl:py-32 px-6 sm:px-8 lg:px-16 bg-[#189172]">
          <div className="container mx-auto">
            <div className="grid gap-8 lg:gap-12 xl:gap-16 items-center lg:grid-cols-2">
              <div>
                <img src={logo} alt="BreadBox Logo" className="h-64 w-64 mb-8" />
              </div>
              <div>
                <h2 className="font-heading text-balance text-2xl md:text-3xl lg:text-4xl text-white mb-4">
                  {t('signup_login.cta-title')}
                </h2>
                <p className="text-lg xl:text-xl text-white mb-8">
                  {t('signup_login.cta-description')}
                </p>

                    {t('signup_login.end-card-description')}

              </div>
            </div>
          </div>
        </section>
        <div className='text-white flex flex-col items-center mt-8 w-11/12 md:w-full'>
          <div className='flex justify-center space-x-10 font-bold text-sm sm:text-base'>
            <a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.about')}</a>
            <a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.repo')}</a>
            <a href="https://github.com/danbergeron3/Breadbox.git">{t('signup_login.contact')}</a>
          </div>
          <span className="mt-5 text-[#3E3F40] font-bold text-xs sm:text-sm">{t('signup_login.footer')}</span>
        </div>

        <div className="fixed bottom-6 right-6">
          <PickLanguageSignIn />
        </div>
      </div>
    </>
  );
}

export default SignUpSignIn;