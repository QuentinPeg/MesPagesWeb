// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';
import AccountCharts from './components/AccountCharts';
import { supabase } from './supabase';
import './App.css';

interface Account {
  id: string;
  date: string;
  name: string;
  expenseCard: string;
  obtainedCard: string;
  transferToSavings: string;
  transferToCard: string;
  obtainedSavings: string;
  obtainedMozaic: string;
  toReview: string;
}

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select('*');

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
  }, []);

  const addAccount = async (account: Account) => {
    const { data, error } = await supabase
      .from('accounts')
      .insert(account)
      .select(); 

    if (error) {
      console.error("Erreur lors de l'insertion du compte :", error);
      return;
    }

    if (data) {
      setAccounts([...accounts, { id: data[0].id, ...account }]);
    } else {
      console.error("Les données insérées sont nulles");
    }
  };

  const deleteAccount = async (id: string) => {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      return;
    }

    setAccounts(accounts.filter(account => account.id !== id));
  };

  const updateAccount = async (id: string, updatedAccount: Partial<Account>) => {
    const { error } = await supabase
      .from('accounts')
      .update(updatedAccount)
      .eq('id', id);

    if (error) {
      console.error("Erreur lors de la mise à jour du compte :", error);
      return;
    }

    setAccounts(accounts.map(account => account.id === id ? { ...account, ...updatedAccount } : account));
  };

  return (
    <Router>
      <div className="App w-full h-full">
        <Header />
        <Routes>
          <Route path="/" element={<AccountForm addAccount={addAccount} accounts={accounts} />} />
          <Route path="/tableau" element={<AccountList accounts={accounts} deleteAccount={deleteAccount} updateAccount={updateAccount} />} />
          <Route path="/graphique" element={<AccountCharts accounts={accounts} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
