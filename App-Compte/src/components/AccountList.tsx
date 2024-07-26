// accountList.tsx
import React, { useState, useEffect, useRef } from 'react';
import AccountSummary from './AccountSummary';
import { supabase } from '../supabase';

interface AccountListProps {
  accounts: Account[];
  deleteAccount: (id: string) => void;
  updateAccount: (id: string, updatedAccount: Partial<Account>) => void;
  livrets: { name: string, obtained: boolean, expense: boolean, move: boolean, moveTo?: string[] }[];
}

interface Account {
  id: string;
  date: string;
  NomDeLaDepense: string;
  Categorie: string;
  ARevoir: string;
  [key: string]: any;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, deleteAccount, updateAccount, livrets }) => {
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedAccounts, setEditedAccounts] = useState<Partial<Account>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columnOrder, setColumnOrder] = useState<string[]>(['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchColumnOrder = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erreur lors de la récupération de l’ordre des colonnes :', error);
        return;
      }
      const user = data.user;
      setColumnOrder(user?.user_metadata?.columnOrder || ['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);
    };
    fetchColumnOrder();
  }, []);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (tableContainer && scrollContainer) {
      const syncScroll = () => {
        scrollContainer.scrollLeft = tableContainer.scrollLeft;
      };
      tableContainer.addEventListener('scroll', syncScroll);
      return () => tableContainer.removeEventListener('scroll', syncScroll);
    }
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    const order = sortDirection === 'asc' ? 1 : -1;

    const isAEmpty = !a[sortColumn] && a[sortColumn] !== 0;
    const isBEmpty = !b[sortColumn] && b[sortColumn] !== 0;

    if (isAEmpty && isBEmpty) return 0;
    if (isAEmpty) return 1;
    if (isBEmpty) return -1;

    if (sortColumn === 'date') {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return (dateA.getTime() - dateB.getTime()) * order;
    } else if (!isNaN(Number(a[sortColumn])) && !isNaN(Number(b[sortColumn]))) {
      return (Number(a[sortColumn]) - Number(b[sortColumn])) * order;
    } else {
      return a[sortColumn].localeCompare(b[sortColumn]) * order;
    }
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(accounts.map(account => account.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    setEditing(false);
    setLoading(true);
    await Promise.all(selectedIds.map(id => deleteAccount(id)));
    setSelectedIds([]);
    setSelectAll(false);
    setLoading(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedAccounts(accounts);
  };

  const handleSaveAll = async () => {
    setEditing(false);
    setLoading(true);
    await Promise.all(editedAccounts.map(account => {
      const { id, ...updatedAccount } = account;
      return updateAccount(id!, updatedAccount);
    }));
    setLoading(false);
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEditedAccounts(editedAccounts.map(account =>
      account.id === id ? { ...account, [name]: value } : account
    ));
  };

  const displayLivretName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="flex flex-col pr-4">
      <AccountSummary accounts={accounts} />

      <h2 className="text-xl mb-2">Liste des comptes</h2>
      <div className="flex flex-wrap justify-evenly mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
          onClick={handleEdit}
          disabled={editing}
        >
          Éditer
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          Supprimer Sélectionnés
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSaveAll}
          disabled={!editing}
        >
          Enregistrer
        </button>
      </div>
      {loading && <div className="text-blue-500 mb-4">En cours de chargement...</div>}
      <div className="relative flex-1 p-2 mx-auto">
        <div ref={tableContainerRef} className="overflow-auto h-full">
          <table className="min-w-full bg-white text-black border-collapse border text-center">
            <thead>
              <tr>
                <th className="py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                {columnOrder.map(column => (
                  <th className="py-2" key={column}>
                    <button
                      className="focus:outline-none flex bg-transparent mx-auto"
                      onClick={() => handleSort(column)}
                    >
                      {displayLivretName(column)} {sortColumn === column && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedAccounts.map((account, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(account.id)}
                      onChange={() => handleSelect(account.id)}
                    />
                  </td>
                  {editing ? (
                    <>
                      {columnOrder.map(column => (
                        <td className="py-2 border border-gray-200 bg-gray-100" key={column}>
                          <input
                            type="text"
                            name={column}
                            value={editedAccounts.find(a => a.id === account.id)?.[column] || ''}
                            onChange={(e) => handleChange(account.id, e)}
                            className="border p-1 w-full text-center bg-gray-200"
                          />
                        </td>
                      ))}
                    </>
                  ) : (
                    <>
                      {columnOrder.map(column => (
                        <td className="py-2 border border-gray-200" key={column}>
                          {account[column]}
                        </td>
                      ))}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
