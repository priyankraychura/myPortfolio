import React, { useState } from 'react'
import Navbar from './Navbar'
import { PuffLoader } from "react-spinners";

export default function Header({ onLoginRegisterClick, userData, onLogout, isLoading }) {
    const [navOpen, setNavOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
            <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid-cols md:grid-cols-[1fr, 3fr, 1fr]">
                <h1>
                    <a href="./" className='logo'>
                        <img
                            src="/images/logo.svg"
                            width={40}
                            height={40}
                            alt="Priyank Raychura" />
                    </a>
                </h1>
                <div className="relative md:justify-self-center">
                    <button
                        className='menu-btn md:hidden'
                        onClick={() => setNavOpen((prev) => !prev)}
                    >
                        <span className='material-symbols-rounded'>
                            {navOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    <Navbar navOpen={navOpen} onLoginRegisterClick={onLoginRegisterClick} userData={userData} onLogout={onLogout} />
                </div>

                <div className="relative md:justify-self-end max-md:hidden">
                    {isLoading ? (
                        <div className="w-9 h-9 flex items-center justify-center">
                            <PuffLoader
                                color="white"
                                loading={true}
                                size={36}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : userData && userData.profileImg ? (
                        <div>
                            <button
                                onClick={() => setIsProfileMenuOpen(prev => !prev)}
                                className="img-box w-9 h-9 rounded-xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={userData.profileImg}
                                    alt={userData.name}
                                    width={40}
                                    height={40}
                                    className='img-cover'
                                    referrerPolicy='no-referrer'
                                />
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-60 bg-zinc-800 rounded-xl shadow-lg ring-1 ring-zinc-50/5 p-4 z-50">
                                    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-b-zinc-700">
                                        <div>
                                            <p className="font-semibold text-white">{userData.name}</p>
                                            <p className="text-sm text-zinc-400">{userData.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-red-700/10 rounded-md flex items-center gap-2"
                                    >
                                        <span className="material-symbols-rounded">logout</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={onLoginRegisterClick}
                            className='btn btn-secondary max-md:hidden'
                        >
                            Login
                        </button>
                    )}
                </div>


            </div>
        </header>
    )
}
