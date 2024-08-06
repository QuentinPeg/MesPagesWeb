// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';
import AccountCharts from './components/AccountCharts';
import Auth from './components/Auth';
import Parametres from './components/Parametres';
import Home from './components/Home';
import Contact from './components/Contact';
import VirtualTransfers from './components/VirtualTransfers'; // Import de la nouvelle page Budget
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

interface Account {
  id: string;
  date: string;
  NomDeLaDepense: string;
  Categorie: string;
  DepenseCarteBleue: string;
  ObtenuCarteBleue: string;
  DeplaceCarteBleueVersLivretA: string;
  DeplaceLivretAVersCarteBleue: string;
  ObtenuLivretA: string;
  ObtenuMozaïque: string;
  ARevoir: string;
  [key: string]: any;
}

interface Livret {
  id: string;
  name: string;
  obtained: boolean;
  expense: boolean;
  move: boolean;
  moveTo?: string[];
}

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [user, setUser] = useState<any>(null);
  const [livrets, setLivrets] = useState<Livret[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLivrets(user?.user_metadata?.livrets || []);
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchAccounts = async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Erreur lors de la récupération des comptes :", error);
        return;
      }

      if (data) {
        const accountsData = data.map(account => ({
          id: account.id,
          ...account
        })) as Account[];

        setAccounts(accountsData);
      } else {
        console.error("Les données récupérées sont nulles");
      }
    };

    fetchAccounts();
  }, [user]);

  const ensureColumnExists = async (columnName: string) => {
    try {
      const cleanColumnName = columnName.replace(/[^a-zA-Z0-9_]/g, '_');
      const { error } = await supabase
        .rpc('check_and_add_column', {
          table_name: 'accounts',
          column_name: cleanColumnName,
          column_type: 'text'
        });

      if (error) throw error;
    } catch (error) {
      console.error(`Erreur lors de la vérification/ajout de la colonne ${columnName} :`, error);
    }
  };

  const addAccount = async (account: Account) => {
    account.id = uuidv4();

    for (const key in account) {
      if (account.hasOwnProperty(key) && key !== 'id' && key !== 'user_id') {
        await ensureColumnExists(key);
      }
    }

    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert({ ...account, user_id: user?.id })
        .select();

      if (error) {
        console.error("Erreur lors de l'insertion du compte :", error);
        return;
      }

      if (data) {
        setAccounts([...accounts, { ...account }]);
      } else {
        console.error("Les données insérées sont nulles");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du compte :", error);
    }
  };

  const updateAccount = async (id: string, updatedAccount: Partial<Account>) => {
    for (const key in updatedAccount) {
      if (updatedAccount.hasOwnProperty(key) && key !== 'id' && key !== 'user_id') {
        await ensureColumnExists(key);
      }
    }

    try {
      const { error } = await supabase
        .from('accounts')
        .update(updatedAccount)
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error("Erreur lors de la mise à jour du compte :", error);
        return;
      }

      setAccounts(accounts.map(account => account.id === id ? { ...account, ...updatedAccount } : account));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du compte :", error);
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        return;
      }

      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App w-full h-full">
        <Header />
        <Routes>
          <Route key="home" path="/" element={user ? <Navigate to="/accountform" /> : <Navigate to="/Home" />} />
          <Route key="home-alt" path="/Home" element={<Home />} />
          <Route key="accountform" path="/accountform" element={user ? <AccountForm addAccount={addAccount} accounts={accounts} livrets={livrets} /> : <Navigate to="/" />} />
          <Route key="tableau" path="/tableau" element={user ? <AccountList accounts={accounts} deleteAccount={deleteAccount} updateAccount={updateAccount} livrets={livrets} /> : <Navigate to="/" />} />
          <Route key="graphique" path="/graphique" element={user ? <AccountCharts accounts={accounts} /> : <Navigate to="/" />} />
          <Route key="budget" path="/budget" element={user ? <VirtualTransfers accounts={accounts} livrets={livrets} /> : <Navigate to="/" />} />
          <Route key="auth" path="/auth" element={<Auth />} />
          <Route key="parametres" path="/parametres" element={user ? <Parametres /> : <Navigate to="/" />} />
          <Route key="contact" path="/contact" element={user ? <Contact /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

