import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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
      const querySnapshot = await getDocs(collection(db, "accounts"));
      const accountsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Account[];
      setAccounts(accountsData);
    };

    fetchAccounts();
  }, []);

  const addAccount = async (account: Account) => {
    const docRef = await addDoc(collection(db, "accounts"), account);
    setAccounts([...accounts, { id: docRef.id, ...account }]);
  };

  const deleteAccount = async (id: string) => {
    await deleteDoc(doc(db, "accounts", id));
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const updateAccount = async (id: string, updatedAccount: Partial<Account>) => {
    await updateDoc(doc(db, "accounts", id), updatedAccount);
    setAccounts(accounts.map(account => account.id === id ? { ...account, ...updatedAccount } : account));
  };

  return (
    <div className="App">
      <Header />
      <AccountForm addAccount={addAccount} />
      <AccountList accounts={accounts} deleteAccount={deleteAccount} updateAccount={updateAccount} />
    </div>
  );
};

export default App;
