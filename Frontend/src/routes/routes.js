import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard.js';
import Expenses from '../pages/Expenses.js';
import Finances from '../pages/Finances.js';
import Settings from '../pages/Settings.js';
import SignUpSignIn from '../pages/SignUpSignIn.js';

const BreadBox = () => {
    return(<>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignUpSignIn />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='/finances' element={<Finances />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default BreadBox;
