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

// Mapping pour l'affichage
const displayNameMap: { [key: string]: string } = {
    CarteBleue: 'Carte Bleue',
    // Ajoutez d'autres mappings si nécessaire
};

const AccountSummary: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
    const [livrets, setLivrets] = useState<Livret[]>([]);
    const [totals, setTotals] = useState<{ [key: string]: number }>({});
    const [user, setUser] = useState<any>(null); // Typage amélioré possible avec une interface utilisateur

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user?.user_metadata?.livrets) {
                // Assurez-vous que les livrets sont des objets Livret
                setLivrets(user.user_metadata.livrets.filter((livret: any) => livret && typeof livret === 'object') as Livret[]);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        const calculateTotals = () => {
            const newTotals: { [key: string]: number } = {};
            let livretACalculations: {
                obtained: number,
                expense: number,
                moveToOthers: number,
                moveFromOthers: number,
            } = {
                obtained: 0,
                expense: 0,
                moveToOthers: 0,
                moveFromOthers: 0,
            };

            // Initialiser les totaux pour chaque livret
            livrets.forEach(livret => {
                newTotals[livret.name] = 0;
            });
            let obtenulivretAtest = 0;
            let depenselivretAtest = 0;
            let deplace1livretAtest = 0;
            let deplace2livretAtest = 0;

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

                    if ('LivretA' === livretName) {
                        obtenulivretAtest += obtenu;
                        depenselivretAtest += depense;
                        deplace1livretAtest += deplaceVersAutres;
                        deplace2livretAtest += deplaceDepuisAutres;
                    }

                    newTotals[livretName] += obtenu - depense - deplaceVersAutres + deplaceDepuisAutres;

                });

            });

            setTotals(newTotals);
        };

        if (livrets.length > 0) {
            calculateTotals();
        }
    }, [accounts, livrets]);

    return (
        <div className="account-summary p-4 rounded-md bg-transparent">
            <h2 className="text-xl mb-2">Résumé des comptes</h2>
            <ul className="flex justify-between gap-4 flex-wrap mb-4 mt-4">
                {livrets.map(livret => {
                    const livretName = livret.name;
                    const formattedName = displayNameMap[livretName] || livretName; // Utilisation du nom formaté pour l'affichage
                    const total = totals[livretName] || 0;
                    return (
                        <li key={livretName} className="p-2 border border-gray-200 rounded-md">
                            Sur le compte {formattedName}: <span className={`font-semibold ${total < 0 ? 'text-red-500' : ''}`}>{total.toFixed(2)} €</span>
                        </li>
                    );
                })}
            </ul>
            <hr className="my-2" />
            <div className='flex justify-center mt-4'>
                <div className="p-2 border border-gray-200 rounded-md inline-block">
                    Total: <span className={`font-bold ${livrets.reduce((sum, livret) => sum + (totals[livret.name] || 0), 0) < 0 ? 'text-red-500' : ''}`}>
                        {livrets.reduce((sum, livret) => sum + (totals[livret.name] || 0), 0).toFixed(2)} €
                    </span>
                </div>
            </div>
        </div >
    );
};

export default AccountSummary;
