// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import bankingImage from './banking.jpg';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <div className="home-container text-center p-8">
      <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1 md:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur Personnal Banking</h1>
          <p className="mb-4">Ce site vous permet de faire vos comptes simplement et de regrouper vos différents livrets ou "enveloppes de dépense".</p>
          <p className="mb-4">Ce projet a été réalisé par Peguin Quentin</p>
          <p className="mt-8">Pour accéder à toutes les fonctionnalités, veuillez vous connecter.</p>
          <div className="flex flex-col items-center">
            <button className="bg-gray-300 mt-4 py-2 px-4 rounded">
              <Link to="/auth" className="login-button">Connexion</Link>
            </button>
            <p className="mb-4 mt-4 text-center">Pour toutes questions, merci de me contacter via le formulaire suivant :</p>
            <div className="w-full flex justify-center">
              <Contact />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 md:w-1/4 w-full">
          <img src={bankingImage} alt="Logo" className="object-contain w-full h-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
