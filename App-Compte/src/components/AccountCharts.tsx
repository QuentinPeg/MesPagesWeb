import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Select from 'react-select';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Account {
    id: string;
    date: string;
    NomDeLaDepense: string;
    Categorie: string; // Ajout de la propriété Categorie
    DepenseCarteBleue: string;
    ObtenuCarteBleue: string;
    DeplaceCarteBleueVersLivretA: string;
    DeplaceLivretAVersCarteBleue: string;
    ObtenuLivretA: string;
    ObtenuMozaïque: string;
    ARevoir: string;
    user_id?: string;
    [key: string]: string | undefined;
}

interface AccountChartsProps {
    accounts: Account[];
}

const AccountCharts: React.FC<AccountChartsProps> = ({ accounts }) => {
    const [selectedCategories, setSelectedCategories] = useState<{ label: string, value: string }[]>([]);
    const [selectedDates, setSelectedDates] = useState<{ label: string, value: string }[]>([]);
    const [granularity, setGranularity] = useState<string>('year');
    const [selectedExpenseType, setSelectedExpenseType] = useState<string>('DepenseCarteBleue');
    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([]);

    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions);
    };

    const handleGranularityChange = (selectedOption: any) => {
        setGranularity(selectedOption.value);
    };

    const handleExpenseTypeChange = (selectedOption: any) => {
        setSelectedExpenseType(selectedOption.value);
    };

    const parseDate = (dateStr: string | null): Date | null => {
        if (!dateStr) {
            return null; // Ou gérer selon vos besoins
        }
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const filterAccounts = useMemo(() => {
        return accounts.filter(account => {
            const accountDate = parseDate(account.date);
            if (!accountDate) return false; // Si la date est invalide, ne pas inclure le compte

            return (
                (selectedCategories.length === 0 || selectedCategories.some(option => option.value === account.Categorie)) &&
                (selectedDates.length === 0 || selectedDates.some(option => {
                    const optionDate = parseDate(option.value);

                    if (!optionDate) return false; // Si la date de l'option est invalide, ne pas inclure le compte
                    if (granularity === 'month') {
                        return optionDate.getMonth() === accountDate.getMonth();
                    }
                    return optionDate.getFullYear() === accountDate.getFullYear();
                }))
            );
        });
    }, [accounts, selectedCategories, selectedDates, granularity]);

    const formatDate = (dateStr: string): string => {
        const date = parseDate(dateStr);
        if (!date) return dateStr; // Si la date est invalide, retourner la chaîne originale

        switch (granularity) {
            case 'year':
                return date.getFullYear().toString();
            case 'month':
                return date.toLocaleString('default', { month: 'long', year: 'numeric' });
            case 'day':
                return dateStr;
            default:
                return dateStr;
        }
    };

    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: selectedExpenseType,
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const labels = Array.from(new Set(filterAccounts.map(account => formatDate(account.date)))).sort((a, b) => {
            // Utiliser parseDate pour obtenir des objets Date corrects pour le tri des jours
            let dateA, dateB;
            if (granularity === 'day') {
                dateA = parseDate(a);
                dateB = parseDate(b);
            } else {
                // Pour les années et les mois, la conversion directe fonctionne
                dateA = new Date(a);
                dateB = new Date(b);
            }
            return (dateA ? dateA.getTime() : 0) - (dateB ? dateB.getTime() : 0);
        });

        const data = labels.map(label =>
            filterAccounts.filter(account => formatDate(account.date) === label)
                .reduce((total, account) => total + parseFloat(account[selectedExpenseType] || '0'), 0)
        );

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: selectedExpenseType,
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    }, [filterAccounts, selectedExpenseType, granularity]); // Ajouter granularity aux dépendances pour recalculer lors du changement de granularité

    // Obtenez dynamiquement les types de dépense à partir des colonnes des comptes
    const expenseTypeOptions = useMemo(() => {
        if (accounts.length === 0) return [];
        const firstAccount = accounts[0];
        return Object.keys(firstAccount)
            .filter(key => key !== 'id' && key !== 'date' && key !== 'NomDeLaDepense' && key !== 'Categorie' && key !== 'ARevoir' && key !== 'user_id')
            .map(key => ({ value: key, label: key.replace(/([A-Z])/g, ' $1').trim() }));
    }, [accounts]);

    const expenseTypeToCategories = useMemo(() => {
        return accounts.reduce((acc, account) => {
            expenseTypeOptions.forEach(option => {
                const expenseType = option.value;
                if (!acc[expenseType]) acc[expenseType] = new Set();
                if (account[expenseType] && parseFloat(account[expenseType]) !== 0) {
                    acc[expenseType].add(account.Categorie);
                }
            });
            return acc;
        }, {} as { [key: string]: Set<string> });
    }, [accounts, expenseTypeOptions]);

    useEffect(() => {
        if (expenseTypeToCategories[selectedExpenseType]) {
            setCategoryOptions(
                Array.from(expenseTypeToCategories[selectedExpenseType]).map(category => ({ value: category, label: category }))
            );
        } else {
            setCategoryOptions([]);
        }
    }, [selectedExpenseType, expenseTypeToCategories]);

    const dateOptions = Array.from(new Set(accounts.map(account => account.date)))
        .map(date => ({ value: date, label: date }));

    const granularityOptions = [
        { value: 'year', label: 'Année' },
        { value: 'month', label: 'Mois' },
        { value: 'day', label: 'Jour' },
    ];

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? 'darkgray' : 'gray',
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: 'darkgray',
        }),
        multiValue: (provided: any, state: any) => ({
            ...provided,
            color: 'darkgray',
        }),
        multiValueLabel: (provided: any, state: any) => ({
            ...provided,
            color: 'darkgray',
        }),
    };

    return (
        <div className="account-charts w-2/3 mx-auto p-4 m-4 bg-gray-100 rounded-md text-center">
            <h2 className="text-xl text-black mb-4">Graphiques des Dépenses</h2>
            <div className="mb-4 flex justify-around">
                <Select
                    options={granularityOptions}
                    onChange={handleGranularityChange}
                    placeholder="Trier par"
                    className="w-1/3"
                    styles={customStyles} // Appliquer les styles personnalisés ici
                />
                <Select
                    options={expenseTypeOptions}
                    onChange={handleExpenseTypeChange}
                    placeholder="Sélectionner le type de dépense"
                    className="w-1/3"
                    styles={customStyles}
                />
                <Select
                    isMulti
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    placeholder="Filtrer par catégorie"
                    className="w-1/3"
                    styles={customStyles}
                />
            </div>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: selectedExpenseType }
                    }
                }}
            />
        </div>
    );
};

export default AccountCharts;
