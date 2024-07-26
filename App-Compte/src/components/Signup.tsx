// src/components/Signup.tsx
import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Erreur lors de la création du compte : ' + error.message);
    } else {
      navigate('/');
      alert("Veuillez vérifier votre boîte de réception pour confirmer votre compte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
    </form>
  );
};

export default Signup;
