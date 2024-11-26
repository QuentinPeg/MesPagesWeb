import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Navbar/logo-splan.png';
import Toggle from './Toggle';
import AvatarMenu from './AvatarMenu.tsx';
import { supabase } from '../../supabaseClient.ts';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState('' as string);

    const redirect = useNavigate()

    const fetchTokenType = async () => {
        const token = (await supabase.auth.getSession());
        console.log("token type = ",token)
    }

    const fetchUserData = async () => {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', (await supabase.auth.getUser()).data.user?.id as string)
          .single()

        if (data) {
            setId(data.id);
        } else {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserData()
        fetchTokenType()
        const { data } = supabase.auth.onAuthStateChange((event, session) => { 
            console.log(event)
            
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                console.log('User is logged in')
                setIsLoggedIn(true);
            } else {
                console.log('User is logged out')
                setIsLoggedIn(false);
            }
            
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 fixed shadow-md dark:shadow-none z-50 dark:bg-gray-900
        w-full rounded-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                
                <div className='flex gap-4 items-center lg:w-[18rem]'>
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Splan Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Splan</span>
                </Link>
                
                </div>
                
                <div className="flex lg:w-[18rem] lg:order-2 space-x-3 gap-1 lg:gap-4 justify-end lg:space-x-0 rtl:space-x-reverse">
                    <Toggle />
                    {isLoggedIn ? (
                        <div className='flex items-center gap-4 rounded-full'>
                            <AvatarMenu />
                        </div>
                    ) : (
                        
                    <div className='items-center gap-2 hidden sm:flex'>
                    
                    <Link to="/login" type="button" className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
                    <Link to="/register" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-700">Get started</Link>

                    </div>
                    )}
                    
                    
                    <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap='round' strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>

                </div>
                <div className={`items-center justify-center w-full lg:flex lg:w-96 lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
                    
                    {isLoggedIn ? (
                        <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

                            <li>
                                <NavLink to="/Feed" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/profile/${id}`} className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Settings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Contact</NavLink>
                            </li>
                        </ul>
                        ) : 
                    <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                        
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Home</NavLink>
                        </li>
                        
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-2 px-3 lg:p-0 text-white bg-green-600 rounded lg:text-green-600 lg:bg-transparent" : "block py-2 px-3 lg:p-0 text-gray-900 dark:text-white rounded"}>Contact</NavLink>
                        </li>
                        <li>
                        
                        <div className='flex items-center gap-2 pt-6 ml-2 sm:hidden'>
                    
                            <Link to="/login" type="button" className="text-gray-900 dark:text-white border bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
                            <Link to="/register" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-700">Get started</Link>

                        </div>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        </nav>
    );
}
