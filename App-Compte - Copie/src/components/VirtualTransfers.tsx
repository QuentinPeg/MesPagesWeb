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
  user_id: string;
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
    comptesource: livrets.length > 0 ? livrets[0].name : '',
    occurrences: 1,
    date: new Date().toISOString().slice(0, 10)
  });
  const [user, setUser] = useState<any>(null);

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
        const { data, error } = await supabase
          .from('virtual_transfers')
          .select('*')
          .eq('user_id', user.id);
        if (error) throw error;
        setVirtualTransfers(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des déplacements virtuels:', error);
      }
    };

    fetchVirtualTransfers();
  }, [user]);

  useEffect(() => {
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

    const transferWithId = { ...newTransfer, id: uuidv4(), user_id: user.id };
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
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce transfert virtuel ?");
    if (!confirmation) return;

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
      <div className="mb-4 flex max-sm:flex-col max-sm:items-center flex-wrap gap-4 items-end justify-evenly">
        <div className="flex flex-col">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={newTransfer.nom}
            onChange={handleInputChange}
            placeholder="Nom"
            className="border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="montant">Montant (€)</label>
          <input
            type="number"
            id="montant"
            name="montant"
            value={newTransfer.montant}
            onChange={handleInputChange}
            placeholder="Montant (€)"
            className="border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="frequence">Fréquence</label>
          <select
            name="frequence"
            id="frequence"
            value={newTransfer.frequence}
            onChange={handleInputChange}
            className="border p-1"
          >
            <option value="par mois">Par mois</option>
            <option value="annuel">Annuel</option>
            <option value="quotidien">Quotidien</option>
            <option value="ponctuel">Ponctuel</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="comptesource">Compte Source</label>
          <select
            name="comptesource"
            id="comptesource"
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="occurrences">Nombre de fois</label>
          <input
            type="number"
            id="occurrences"
            name="occurrences"
            value={newTransfer.occurrences}
            onChange={handleInputChange}
            placeholder="Nombre de fois"
            className="border p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newTransfer.date}
            onChange={handleInputChange}
            className="border p-1"
          />
        </div>
        <button onClick={addTransfer} className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </div>
      <ul className="mt-4 space-y-4">
        {virtualTransfers.map(transfer => (
          <li key={transfer.id} className="border p-2 flex justify-between items-center">
            <span className='mb-2 sm:mb-0'>
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
