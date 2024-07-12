import React, { useState } from 'react';

interface AccountListProps {
  accounts: Account[];
  deleteAccount: (id: string) => void;
  updateAccount: (id: string, updatedAccount: Partial<Account>) => void;
}

interface Account {
  id: string;
  Date: string;
  NomDeLaDepense: string;
  DepenseCarteBleue: string;
  ObtenuCarteBleue: string;
  DeplaceCarteBleueVersLivretA: string;
  DeplaceLivretAVersCarteBleue: string;
  ObtenuLivretA: string;
  ObtenuMozaïque: string;
  ARevoir: string;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, deleteAccount, updateAccount }) => {
  const [sortColumn, setSortColumn] = useState<string>('Date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedAccounts, setEditedAccounts] = useState<Partial<Account>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  
    if (sortColumn === 'Date') {
      const dateA = parseDate(a.Date);
      const dateB = parseDate(b.Date);
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
    await Promise.all(selectedIds.map(id => deleteAccount(id)));
    setSelectedIds([]);
    setSelectAll(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedAccounts(accounts);
  };

  const handleSaveAll = async () => {
    setEditing(false);
    setLoading(true); // Start loading
    await Promise.all(editedAccounts.map(account => {
      const { id, ...updatedAccount } = account;
      return updateAccount(id!, updatedAccount);
    }));
    setLoading(false); // Stop loading
    window.location.reload();
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Validation pour ARevoir
    if (name === 'ARevoir' && value !== '' && value !== 'Oui') {
      alert('ARevoir ne peut contenir que "" ou "Oui".');
      return;
    }
  
    setEditedAccounts(editedAccounts.map(account =>
      account.id === id ? { ...account, [name]: value } : account
    ));
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Liste des comptes</h2>
      <div className="flex mb-4">
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
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('Date')}
              >
                Date {sortColumn === 'Date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('NomDeLaDepense')}
              >
                Nom de la dépense {sortColumn === 'NomDeLaDepense' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('DepenseCarteBleue')}
              >
                Dépense Carte Bleue {sortColumn === 'DepenseCarteBleue' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('ObtenuCarteBleue')}
              >
                Obtenu Carte Bleue {sortColumn === 'ObtenuCarteBleue' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('DeplaceCarteBleueVersLivretA')}
              >
                Déplacé Carte Bleue vers Livret A {sortColumn === 'DeplaceCarteBleueVersLivretA' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('DeplaceLivretAVersCarteBleue')}
              >
                Déplacé Livret A vers Carte Bleue {sortColumn === 'DeplaceLivretAVersCarteBleue' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('ObtenuLivretA')}
              >
                Obtenu livret A {sortColumn === 'ObtenuLivretA' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('ObtenuMozaïque')}
              >
                Obtenu Mozaïque {sortColumn === 'ObtenuMozaïque' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="py-2">
              <button
                className="focus:outline-none flex bg-transparent"
                onClick={() => handleSort('ARevoir')}
              >
                A revoir {sortColumn === 'ARevoir' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
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
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="Date"
                      value={editedAccounts.find(a => a.id === account.id)?.Date || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="NomDeLaDepense"
                      value={editedAccounts.find(a => a.id === account.id)?.NomDeLaDepense || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="DepenseCarteBleue"
                      value={editedAccounts.find(a => a.id === account.id)?.DepenseCarteBleue || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="ObtenuCarteBleue"
                      value={editedAccounts.find(a => a.id === account.id)?.ObtenuCarteBleue || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="DeplaceCarteBleueVersLivretA"
                      value={editedAccounts.find(a => a.id === account.id)?.DeplaceCarteBleueVersLivretA || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="DeplaceLivretAVersCarteBleue"
                      value={editedAccounts.find(a => a.id === account.id)?.DeplaceLivretAVersCarteBleue || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="ObtenuLivretA"
                      value={editedAccounts.find(a => a.id === account.id)?.ObtenuLivretA || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <input
                      type="text"
                      name="ObtenuMozaïque"
                      value={editedAccounts.find(a => a.id === account.id)?.ObtenuMozaïque || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    />
                  </td>
                  <td className="py-2 border border-gray-200 bg-gray-100">
                    <select
                      name="ARevoir"
                      value={editedAccounts.find(a => a.id === account.id)?.ARevoir || ''}
                      onChange={(e) => handleChange(account.id, e)}
                      className="border p-1 w-full text-center bg-gray-200"
                    >
                      <option value="">Non</option>
                      <option value="Oui">Oui</option>
                    </select>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 border border-gray-200">{account.Date}</td>
                  <td className="py-2 border border-gray-200">{account.NomDeLaDepense}</td>
                  <td className="py-2 border border-gray-200">{account.DepenseCarteBleue}</td>
                  <td className="py-2 border border-gray-200">{account.ObtenuCarteBleue}</td>
                  <td className="py-2 border border-gray-200">{account.DeplaceCarteBleueVersLivretA}</td>
                  <td className="py-2 border border-gray-200">{account.DeplaceLivretAVersCarteBleue}</td>
                  <td className="py-2 border border-gray-200">{account.ObtenuLivretA}</td>
                  <td className="py-2 border border-gray-200">{account.ObtenuMozaïque}</td>
                  <td className="py-2 border border-gray-200">{account.ARevoir}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};  
export default AccountList;
