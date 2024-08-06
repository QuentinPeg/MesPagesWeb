// src/components/Auth.tsx
import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert('Erreur lors de la création du compte : ' + error.message);
      } else {
        alert("Veuillez vérifier votre boîte de réception pour confirmer votre compte.");
        setIsSignup(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert('Erreur de connexion : ' + error.message);
      } else {
        navigate('/');
        window.location.reload();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form mx-auto w-96 bg-gray-500 p-8 rounded-lg shadow-md m-8">
      <h2 className="text-2xl mb-4">{isSignup ? 'Inscription' : 'Connexion'}</h2>
      <div className="mb-4">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">{isSignup ? 'Inscription' : 'Connexion'}</button>
      <div className="mt-4">
        <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-blue-500">
          {isSignup ? 'Déjà un compte ? Connectez-vous !' : "Pas de compte ? Inscrivez-vous !"}
        </button>
      </div>
    </form>
  );
};

export default Auth;
