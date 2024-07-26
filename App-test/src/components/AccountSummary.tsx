// src/components/AccountSummary.tsx
import React from 'react';

interface Account {
    id: string;
    date: string;
    NomDeLaDepense: string;
    DepenseCarteBleue: string;
    ObtenuCarteBleue: string;
    DeplaceCarteBleueVersLivretA: string;
    DeplaceLivretAVersCarteBleue: string;
    ObtenuLivretA: string;
    ObtenuMozaïque: string;
    ARevoir: string;
}

interface AccountSummaryProps {
    accounts: Account[];
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ accounts }) => {
    const totalDepenseCarte = -accounts.reduce((total, account) => total + parseFloat(account.DepenseCarteBleue || '0'), 0);
    const totalGainCarte = accounts.reduce((total, account) => total + parseFloat(account.ObtenuCarteBleue || '0'), 0);
    const totalCbSurLivretA = accounts.reduce((total, account) => total + parseFloat(account.DeplaceCarteBleueVersLivretA || '0'), 0);
    const totalLivretASurCb = accounts.reduce((total, account) => total + parseFloat(account.DeplaceLivretAVersCarteBleue || '0'), 0);
    const totalGainLivretA = accounts.reduce((total, account) => total + parseFloat(account.ObtenuLivretA || '0'), 0);
    const totalGainMozaique = accounts.reduce((total, account) => total + parseFloat(account.ObtenuMozaïque || '0'), 0);

    const totalCB = totalGainCarte + totalDepenseCarte - totalCbSurLivretA + totalLivretASurCb;

    const totalLivretA = totalCbSurLivretA + totalGainLivretA;

    return (
        <div className="account-summary p-4 rounded-md bg-transparent">
            <h2 className="text-xl mb-2">Résumé des comptes</h2>
            <ul className="flex justify-between gap-4 flex-wrap mb-4 mt-4">
                <li className="p-2 border border-gray-200 rounded-md">Sur la carte Bleu: <span className="font-semibold">{totalCB.toFixed(2)} €</span></li>
                <li className="p-2 border border-gray-200 rounded-md">Sur le compte Livret A: <span className="font-semibold">{totalLivretA.toFixed(2)} €</span></li>
                <li className="p-2 border border-gray-200 rounded-md">Sur le compte Mozaïque: <span className="font-semibold">{totalGainMozaique.toFixed(2)} €</span></li>
            </ul>
            <hr className="my-2" />
            <div className='flex justify-center mt-4'>
                <div className="p-2 border border-gray-200 rounded-md inline-block">Total: <span className="font-bold">{(totalCB + totalLivretA + totalGainMozaique).toFixed(2)} €</span></div>
            </div>
        </div>

    );
};

export default AccountSummary;
