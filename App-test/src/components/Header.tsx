// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className=' bg-blue-500 text-white p-4 flex justify-between top-0'>
      <Link to="/" className="mr-4 text-white"> <h1 className="text-2xl">Gestion de Comptes</h1> </Link>
      <Link to="/" className="mr-4 text-white">Accueil</Link>
      <Link to="/tableau" className="mr-4 text-white">Tableau</Link>
      <Link to="/graphique" className="mr-4 text-white">Graphique</Link>
    </nav>
  );
};

export default Header;
