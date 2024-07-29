// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import bankingImage from './banking.jpg';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmed) {
      await supabase.auth.signOut();
      navigate('/Home');
      window.location.reload();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-blue-500 text-white p-4 flex justify-between items-center'>
      <Link to={user ? "/accountform" : "/"} className="flex items-center text-white mr-4">
        <img src={bankingImage} alt="Logo" className="w-12 rounded-full" style={{ cursor: 'pointer' }} />
        <h1 className="text-2xl pl-3">Gestion de Comptes</h1>
      </Link>
      {user ? (
        <div className='flex justify-evenly w-1/2 items-center'>
          <Link to="/accountform" className="text-white border border-gray-200 rounded-md p-2">Accueil</Link>
          <Link to="/tableau" className="text-white border border-gray-200 rounded-md p-2">Tableau</Link>
          <Link to="/graphique" className="text-white border border-gray-200 rounded-md p-2">Graphique</Link>
        </div>
      ) : null}
      <div className="relative flex items-center">
        {user ? (
          <div className="relative flex flex-col items-center pr-4" onClick={toggleMenu} ref={menuRef}>
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
    </nav>
  );
};

export default Header;
