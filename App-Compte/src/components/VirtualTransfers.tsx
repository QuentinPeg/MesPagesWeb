import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import AccountSummary from './AccountSummary';
import AccountSummaryVirtuel from './AccountSummaryVirtuel';

interface VirtualTransfer {
  id: string;
  nom: string;
  montant: number;
  frequence: string;
  comptesource: string;
  occurrences: number;
  date: string;
  user_id: string; // Ajouter l'utilisateur
}

interface Account {
  id: string;
  date: string;
  NomDeLaDepense: string;
  [key: string]: string;
}

interface Livret {
  id: string;
  name: string;
  obtained: boolean;
  expense: boolean;
  move: boolean;
  moveTo?: string[];
}

const VirtualTransfers: React.FC<{ accounts: Account[], livrets: Livret[] }> = ({ accounts, livrets }) => {
  const [virtualTransfers, setVirtualTransfers] = useState<VirtualTransfer[]>([]);
  const [newTransfer, setNewTransfer] = useState<Omit<VirtualTransfer, 'id' | 'user_id'>>({
    nom: '',
    montant: 0,
    frequence: 'par mois',
    comptesource: livrets.length > 0 ? livrets[0].name : '', // Valeur par défaut basée sur le premier livret
    occurrences: 1,
    date: new Date().toISOString().slice(0, 10)
  });
  const [user, setUser] = useState<any>(null); // État pour stocker l'utilisateur

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchVirtualTransfers = async () => {
      try {
        // Filtrer les transferts virtuels par user_id
        const { data, error } = await supabase
          .from('virtual_transfers')
          .select('*')
          .eq('user_id', user.id); // Filtrer par user_id
        if (error) throw error;
        setVirtualTransfers(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des déplacements virtuels:', error);
      }
    };

    fetchVirtualTransfers();
  }, [user]);

  useEffect(() => {
    // Mise à jour de la valeur par défaut de comptesource si les livrets changent
    if (livrets.length > 0 && newTransfer.comptesource === '') {
      setNewTransfer(prev => ({
        ...prev,
        comptesource: livrets[0].name
      }));
    }
  }, [livrets]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransfer(prev => ({
      ...prev,
      [name]: name === 'montant' || name === 'occurrences' ? parseFloat(value) : value
    }));
  };

  const addTransfer = async () => {
    if (!user) return;

    const transferWithId = { ...newTransfer, id: uuidv4(), user_id: user.id }; // Ajouter user_id
    try {
      const { data, error } = await supabase.from('virtual_transfers').insert([transferWithId]).select();
      if (error) throw error;
      if (data) {
        setVirtualTransfers([...virtualTransfers, data[0]]);
        setNewTransfer({ nom: '', montant: 0, frequence: 'par mois', comptesource: livrets[0]?.name || '', occurrences: 1, date: new Date().toISOString().slice(0, 10) });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du déplacement virtuel:", error);
    }
  };

  const deleteTransfer = async (id: string) => {
    try {
      const { error } = await supabase.from('virtual_transfers').delete().eq('id', id);
      if (error) throw error;
      setVirtualTransfers(virtualTransfers.filter(transfer => transfer.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du déplacement virtuel:', error);
    }
  };

  return (
    <div className="virtual-transfers p-4">
      <AccountSummary accounts={accounts} />

      <h2 className="text-xl mb-4">Déplacements Virtuels</h2>
      <div className="mb-4 flex flex-wrap gap-4 items-end">
        <input
          type="text"
          name="nom"
          value={newTransfer.nom}
          onChange={handleInputChange}
          placeholder="Nom"
          className="border p-1"
        />
        <input
          type="number"
          name="montant"
          value={newTransfer.montant}
          onChange={handleInputChange}
          placeholder="Montant (€)"
          className="border p-1"
        />
        <select
          name="frequence"
          value={newTransfer.frequence}
          onChange={handleInputChange}
          className="border p-1"
        >
          <option value="par mois">Par mois</option>
          <option value="annuel">Annuel</option>
          <option value="quotidien">Quotidien</option>
          <option value="ponctuel">Ponctuel</option>
        </select>
        <select
          name="comptesource"
          value={newTransfer.comptesource}
          onChange={handleInputChange}
          className="border p-1"
        >
          {livrets.map(livret => (
            <option key={livret.id} value={livret.name}>
              {livret.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="occurrences"
          value={newTransfer.occurrences}
          onChange={handleInputChange}
          placeholder="Nombre de fois"
          className="border p-1"
        />
        <input
          type="date"
          name="date"
          value={newTransfer.date}
          onChange={handleInputChange}
          className="border p-1"
        />
        <button onClick={addTransfer} className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </div>
      <ul className="mt-4 space-y-4">
        {virtualTransfers.map(transfer => (
          <li key={transfer.id} className="border p-2 flex justify-between items-center">
            <span>
              Transfert virtuel : Date de début {transfer.date}, {transfer.nom} de {transfer.montant}€ ({transfer.frequence}) déplacé depuis : {transfer.comptesource}, {transfer.occurrences} fois. 
            </span>
            <button onClick={() => deleteTransfer(transfer.id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
          </li>
        ))}
      </ul>
      <AccountSummaryVirtuel accounts={accounts} virtualTransfers={virtualTransfers} />
    </div>
  );
};

export default VirtualTransfers;
