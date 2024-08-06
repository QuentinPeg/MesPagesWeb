import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

interface Account {
  id: string;
  date: string;
  NomDeLaDepense: string;
  [key: string]: string;
}

interface Livret {
  name: string;
  obtained: boolean;
  expense: boolean;
  move: boolean;
  moveTo?: string[];
}

interface VirtualTransfer {
  id: string;
  nom: string;
  montant: number;
  frequence: string;
  comptesource: string;
  occurrences: number;
  date: string;
}

// Mapping pour l'affichage
const displayNameMap: { [key: string]: string } = {
  CarteBleue: 'Carte Bleue',
  // Ajoutez d'autres mappings si nécessaire
};

const AccountSummaryVirtuel: React.FC<{ accounts: Account[], virtualTransfers: VirtualTransfer[] }> = ({ accounts, virtualTransfers }) => {
  const [livrets, setLivrets] = useState<Livret[]>([]);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user?.user_metadata?.livrets) {
        setLivrets(user.user_metadata.livrets.filter((livret: any) => livret && typeof livret === 'object') as Livret[]);
      }
    };
    getUser();
  }, []);

  const calculateOccurrences = (startDate: string, frequence: string): number => {
    const currentDate = new Date();
    const start = new Date(startDate);
    let occurrences = 0;

    while (start <= currentDate) {
      occurrences++;
      switch (frequence) {
        case 'par mois':
          start.setMonth(start.getMonth() + 1);
          break;
        case 'annuel':
          start.setFullYear(start.getFullYear() + 1);
          break;
        case 'quotidien':
          start.setDate(start.getDate() + 1);
          break;
        case 'ponctuel':
          return 1;
        default:
          break;
      }
    }

    return occurrences;
  };

  useEffect(() => {
    const calculateTotals = () => {
      const newTotals: { [key: string]: number } = {};

      // Initialiser les totaux pour chaque livret
      livrets.forEach(livret => {
        newTotals[livret.name] = 0;
      });

      // Ajouter les comptes
      accounts.forEach(account => {
        livrets.forEach(livret => {
          const livretName = livret.name;
          const depense = parseFloat(account[`Depense${livretName}`] || '0');
          const obtenu = parseFloat(account[`Obtenu${livretName}`] || '0');
          let deplaceVersAutres = 0;
          let deplaceDepuisAutres = 0;

          livrets.forEach(otherLivret => {
            if (livretName !== otherLivret.name) {
              const deplaceVers = parseFloat(account[`Deplace${livretName}Vers${otherLivret.name}`] || '0');
              const deplaceDepuis = parseFloat(account[`Deplace${otherLivret.name}Vers${livretName}`] || '0');

              deplaceVersAutres += deplaceVers;
              deplaceDepuisAutres += deplaceDepuis;
            }
          });

          newTotals[livretName] += obtenu - depense - deplaceVersAutres + deplaceDepuisAutres;
        });
      });

      // Ajouter les transferts virtuels dans les catégories appropriées
      virtualTransfers.forEach(transfer => {
        const livretName = transfer.nom; // Utiliser le nom du transfert comme nom de la catégorie
        const sourceName = transfer.comptesource; // Compte source pour soustraction

        const occurrences = calculateOccurrences(transfer.date, transfer.frequence);
        const totalAmount = transfer.montant * occurrences;

        // Ajouter au compte de destination (ou créer la catégorie si elle n'existe pas)
        if (!newTotals[livretName]) {
          newTotals[livretName] = 0;
        }
        newTotals[livretName] += totalAmount;

        // Soustraire du compte source si pertinent
        if (sourceName && newTotals[sourceName] !== undefined) {
          newTotals[sourceName] -= totalAmount;
        }
      });

      setTotals(newTotals);
    };

    if (livrets.length > 0) {
      calculateTotals();
    }
  }, [accounts, livrets, virtualTransfers]);

  // Calcul du total général, en excluant les catégories de transferts virtuels
  const generalTotal = Object.keys(totals)
    .filter(key => livrets.some(livret => livret.name === key)) // Filtrer les livrets réels
    .reduce((sum, key) => sum + (totals[key] || 0), 0);

  return (
    <div className="account-summary p-4 rounded-md bg-transparent">
      <h2 className="text-xl mb-2">Résumé des comptes</h2>
      <ul className="flex justify-between gap-4 flex-wrap mb-4 mt-4">
        {Object.keys(totals).map(livretName => {
          const formattedName = displayNameMap[livretName] || livretName;
          const total = totals[livretName] || 0;
          return (
            <li key={livretName} className="p-2 border border-gray-200 rounded-md">
              Virtuellement <br/> sur le compte {formattedName}: <span className="font-semibold">{total.toFixed(2)} €</span>
            </li>
          );
        })}
      </ul>
      <hr className="my-2" />
      <div className='flex justify-center mt-4'>
        <div className="p-2 border border-gray-200 rounded-md inline-block">
          Total: <span className="font-bold">{generalTotal.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryVirtuel;
