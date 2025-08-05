import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function Navbar({ navOpen, onLoginRegisterClick, userData, onLogout }) {
    const lastActiveLink = useRef()
    const activeBox = useRef()

    const initActiveBox = () => {
        if (lastActiveLink.current && activeBox.current) {
            activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px'
            activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px'
            activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px'
            activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px'
        }
    }

    const activeCurrentLink = (event) => {
        lastActiveLink.current ?.classList.remove('active');
        event.target.classList.add('active')
        lastActiveLink.current = event.target;

        activeBox.current.style.top = event.target.offsetTop + 'px'
        activeBox.current.style.left = event.target.offsetLeft + 'px'
        activeBox.current.style.width = event.target.offsetWidth + 'px'
        activeBox.current.style.height = event.target.offsetHeight + 'px'
    }

    useEffect(() => {
        initActiveBox();
        window.addEventListener('resize', initActiveBox);

        return () => {
            window.removeEventListener('resize', initActiveBox);
        };
    }, [userData, navOpen]);

    const navItems = [
        {
            label: 'Home',
            link: './#home',
            className: 'nav-link active',
            ref: lastActiveLink
        },
        {
            label: 'About',
            link: './#about',
            className: 'nav-link'
        },
        {
            label: 'Work',
            link: './#work',
            className: 'nav-link'
        },
        {
            label: 'Education',
            link: './#education',
            className: 'nav-link'
        },
        {
            label: 'Awards',
            link: './#awards',
            className: 'nav-link'
        },
        {
            label: 'Reviews',
            link: './#reviews',
            className: 'nav-link'
        },
        {
            label: 'Contact',
            link: './#contact',
            className: 'nav-link'
        }
    ];

    return (
        <nav className={'navbar ' + (navOpen ? 'active' : '')}>
            {
                navItems.map(({ label, link, className, ref }, key) => {
                    return (
                        <a
                            href={link}
                            key={key}
                            ref={ref}
                            className={className}
                            onClick={activeCurrentLink}>
                            {label}
                        </a>
                    )
                })
            }

            <div className="mt-auto pt-4 border-t border-zinc-700 w-full md:hidden">
                {userData && userData.profileImg ? (
                    <div>
                        <div className="flex items-center gap-3 mb-4 p-2">
                            <figure className='img-box w-11 h-11 rounded-xl overflow-hidden flex-shrink-0'>
                                <img
                                    src={userData.profileImg}
                                    alt={userData.name}
                                    width={40}
                                    height={40}
                                    className='img-cover'
                                    referrerPolicy='no-referrer'
                                />
                            </figure>
                            <div className="truncate">
                                <p className="font-semibold text-white truncate">{userData.name}</p>
                                <p className="text-sm text-zinc-400 truncate">{userData.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="btn hover:bg-red-700/10 [&]:max-w-full w-full flex justify-center"
                        >
                            <span className="material-symbols-rounded" aria-hidden="true">logout</span>
                            <span className="span">Logout</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onLoginRegisterClick}
                        className='btn bg-sky-400/30 [&]:max-w-full w-full md:hidden'
                    >
                        <span className="span">Login</span>
                    </button>
                )}
            </div>

            <div
                className="active-box"
                ref={activeBox}>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired,
    onLoginRegisterClick: PropTypes.func.isRequired,
    userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onLogout: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
}