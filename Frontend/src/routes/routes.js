/*
  * File: 
    *routes.js

  * Description: Routes for navigating pages
*/

import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard.js';
import Expenses from '../pages/Expenses.js';
import Finances from '../pages/Finances.js';
import Settings from '../pages/Settings.js';
import SignUpSignIn from '../pages/SignUpSignIn.js';

const BreadBox = () => {
    return(<>
        {/* BrowserRouter to manage routing */}
        <BrowserRouter>
            <Routes>
                {/* Route to display SignUpSignIn page when path is '/' */}
                <Route path='/' element={<SignUpSignIn />} />
                {/* Route to display Dasboard page when path is '/' */}
                <Route path='/dashboard' element={<Dashboard />} />
                {/* Route to display Expenses page when path is '/' */}
                <Route path='/expenses' element={<Expenses />} />
                {/* Route to display Finances page when path is '/' */}
                <Route path='/finances' element={<Finances />} />
                {/* Route to display Settings page when path is '/' */}
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default BreadBox;
