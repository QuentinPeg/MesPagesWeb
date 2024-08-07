// src/components/Header.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import bankingImage from './banking.jpg';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmed) {
      await supabase.auth.signOut();
      navigate('/Home');
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div>
      <nav className='bg-blue-500 text-white p-4'>
        <div className='flex justify-between items-center'>
          <Link to={user ? "/accountform" : "/"} className="flex items-center text-white mr-4 max-sm:hidden">
            <img src={bankingImage} alt="Logo" className="w-12 rounded-full" style={{ cursor: 'pointer' }} />
            <h1 className="text-2xl pl-3">Gestion de Comptes</h1>
          </Link>
          {user ? (
            <div className='flex justify-evenly w-1/2 items-center max-sm:hidden'>
              <Link to="/accountform" className="text-white border border-gray-200 rounded-md p-2">Accueil</Link>
              <Link to="/tableau" className="text-white border border-gray-200 rounded-md p-2">Tableau</Link>
              <Link to="/graphique" className="text-white border border-gray-200 rounded-md p-2">Graphique</Link>
              <Link to="/EnvellopesVirtuelles" className="text-white border border-gray-200 rounded-md p-2">Envellopes Virtuelles</Link> {/* Ajout du lien Budget */}
            </div>
          ) : null}

          <Link to={user ? "/accountform" : "/"} className="flex items-center text-white mr-4 sm:hidden">
            <img src={bankingImage} alt="Logo" className="w-12 rounded-full" style={{ cursor: 'pointer' }} />
            <h1 className="text-2xl pl-3">Gestion de Comptes</h1>
          </Link>
          {user ? (
            <div className='flex justify-evenly sm:flex-row flex-col w-max items-center sm:hidden'>
              <button
                className="sm:hidden text-white border border-gray-200 rounded-md p-2 mb-2"
                onClick={toggleVisibility}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <div ref={menuRef} className={`flex sm:w-full sm:flex-row flex-col justify-evenly items-center sm:static sm:top-auto max-sm:absolute max-sm:top-[100px] max-sm:left-1/2 transform max-sm:-translate-x-1/2 bg-blue-500 p-4 rounded-md w-[100vw] z-10 ${isVisible ? 'block' : 'hidden'} sm:block`}>
                <Link to="/accountform" className="text-white border border-gray-200 rounded-md p-2 mb-2 sm:mb-0">Accueil</Link>
                <Link to="/tableau" className="text-white border border-gray-200 rounded-md p-2 mb-2 sm:mb-0">Tableau</Link>
                <Link to="/graphique" className="text-white border border-gray-200 rounded-md p-2 mb-2 sm:mb-0">Graphique</Link>
                <Link to="/EnvellopesVirtuelles" className="text-white border border-gray-200 rounded-md p-2">Envellopes Virtuelles</Link> {/* Ajout du lien Budget */}
              </div>
            </div>
          ) : null}
          <div className="relative flex items-center">
            {user ? (
              <div className="relative flex flex-col items-center pr-4" onClick={toggleMenu} ref={userMenuRef}>
                <img src={bankingImage} alt="Avatar" className="w-8 h-8 rounded-full cursor-pointer" />
                <span className="text-sm cursor-pointer">{user.user_metadata?.full_name || user.email}</span>
                {menuOpen && (
                  <div className="absolute top-full mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <button onClick={() => navigate('/parametres')} className="block w-full text-left px-4 py-2 bg-gray-200 hover:bg-slate-400">Paramètres</button>
                    <button onClick={() => navigate('/contact')} className="block w-full text-left px-4 py-2 bg-gray-200 hover:bg-slate-400">Contact</button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 bg-gray-200 hover:bg-slate-400">Déconnexion</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="text-white mr-4">Connexion</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
