import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import  Home from './Home.jsx'
import { Signup } from './Signup.jsx'
import { Dashboard } from './Dashboard.jsx'
import { Login } from './Login.jsx'
import download from './assets/download.png'

const Navbar = () => {
    const [ selectedPage, setSelectedPage ] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <nav className="fixed w-screen bg-secondary-500 h-[80px] z-10 drop-shadow-xl bg-violet-400 text-lg">
                <div className="flex justify-between w-full h-full px-20">
                    <div className="flex items-center gap-10">
                        <img
                        className="px-0 h-20" 
                        alt="logo"
                        src={download}
                        onClick={() => navigate('/')}
                        />
                        <Link
                            to="/"
                            onClick={() => setSelectedPage('home')}
                            className={`${
                                selectedPage === 'home'
                                ? 'text-tertiary-500'
                                : 'text-primary-500'
                            } hover:text-opacity-75`}
                            > Home
                        </Link>
                        </div>
                        <div className="flex items-center gap-10">
                            <Link to='/login'>
                                <button className="bg-primary-500 text-secondary-500 hover:text-indigo-900">
                                    Login
                                </button>
                            </Link>
                            <Link to='/signup'>
                                <button className="bg-primary-500 text-secondary-500 hover:text-indigo-900">
                                    Signup Here
                                </button>
                            </Link>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </>
    )
}

export default Navbar;