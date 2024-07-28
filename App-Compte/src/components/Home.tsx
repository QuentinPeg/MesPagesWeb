// src/components/Home.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bankingImage from './banking.jpg';
import Contact from './Contact';


const Home: React.FC = () => {
  return (
    <div className="home-container text-center p-8">
      <div className='flex flex-row items-center space-x-4'>
        <div className="flex-1 w-3/4">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur Personnal Banking</h1>
          <p className="mb-4">Ce site vous permet de faire vos comptes simplement et de regrouper vos différents livrets ou "enveloppes de dépense".</p>
          <p className="mb-4">Ce projet a été réalisé par Peguin Quentin</p>
          <p className="mt-8">Pour accéder à toutes les fonctionnalités, veuillez vous connecter.</p>
          <button className='bg-gray-300 mt-4 py-2 px-4 rounded'>
            <Link to="/auth" className="login-button">Connexion</Link>
          </button>
          <p className="mb-4">Pour toutes questions, merci de me contacter via le formulaire suivant :</p>
          <Contact/>
        </div>
        <div className="flex-shrink-0 w-1/4">
          <img src={bankingImage} alt="Logo" className="object-contain w-full h-full rounded-full"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
