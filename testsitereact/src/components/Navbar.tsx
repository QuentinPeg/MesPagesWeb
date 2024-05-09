import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/Navbar/logo.jpeg';
import { Toggle } from './Toggle';
import Horloge from '../components/horloge.tsx'; // Assurez-vous que le chemin est correct

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-purple-500 border-gray-200 fixed shadow-md dark:shadow-none z-50 dark:bg-purple-900
        w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div className='flex gap-4 items-center md:w-100 md:order-1'>
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8 rounded-full" alt="Mon chez moi Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mon chez moi </span>
                    </Link>
                </div>
                <div className='block md:order-2'>
                    <Toggle />
                </div>

                <div className="flex md:w-16 md:order-5 space-x-3 justify-end md:space-x-0 rtl:space-x-reverse">
                    <Horloge />
                </div>
                <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`items-center justify-between w-full md:flex md:w-64 md:order-3 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-purple-500 dark:bg-gray-800 md:dark:bg-purple-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "block py-2 px-3 md:p-0 text-white bg-purple-500 dark:bg-purple-900 rounded md:text-white md:underline md:bg-transparent" : "block py-2 px-3 md:p-0 dark:text-white text-black md:dark:text-black md:text-black rounded"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? "block py-2 px-3 md:p-0 text-white bg-purple-500 dark:bg-purple-900 rounded md:text-white md:underline md:bg-transparent" : "block py-2 px-3 md:p-0 dark:text-white text-black md:dark:text-black md:text-black rounded"}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className={({ isActive }) => isActive ? "block py-2 px-3 md:p-0 text-white bg-purple-500 dark:bg-purple-900 rounded md:text-white md:underline md:bg-transparent" : "block py-2 px-3 md:p-0 dark:text-white text-black md:dark:text-black md:text-black rounded"}>Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-2 px-3 md:p-0 text-white bg-purple-500 dark:bg-purple-900 rounded md:text-white md:underline md:bg-transparent" : "block py-2 px-3 md:p-0 dark:text-white text-black md:dark:text-black md:text-black rounded"}>Contact</NavLink>
                        </li>
                    </ul>
                </div>
                
                <div className='hidden md:order-4'></div>

            </div>
        </nav>
    );
}

