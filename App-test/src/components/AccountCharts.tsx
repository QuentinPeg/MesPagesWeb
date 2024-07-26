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
    DepenseCarteBleue: string;
    ObtenuCarteBleue: string;
    DeplaceCarteBleueVersLivretA: string;
    DeplaceLivretAVersCarteBleue: string;
    ObtenuLivretA: string;
    ObtenuMozaïque: string;
    ARevoir: string;
}

interface AccountChartsProps {
    accounts: Account[];
}

const AccountCharts: React.FC<AccountChartsProps> = ({ accounts }) => {
    const [selectedNames, setSelectedNames] = useState<{ label: string, value: string }[]>([]);
    const [selectedDates, setSelectedDates] = useState<{ label: string, value: string }[]>([]);
    const [granularity, setGranularity] = useState<string>('year');
    const [selectedExpenseType, setSelectedExpenseType] = useState<string>('DepenseCarteBleue');
    const [nameOptions, setNameOptions] = useState<{ label: string, value: string }[]>([]);

    const handleNameChange = (selectedOptions: any) => {
        setSelectedNames(selectedOptions);
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
                (selectedNames.length === 0 || selectedNames.some(option => option.value === account.NomDeLaDepense)) &&
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
    }, [accounts, selectedNames, selectedDates, granularity]);

    const formatDate = (dateStr: string): string => {
        const date = parseDate(dateStr);
        if (!date) return dateStr; // Si la date est invalide, retourner la chaîne originale

        switch (granularity) {
            case 'year':
                return date.getFullYear().toString();
            case 'month':
                return date.toLocaleString('default', { month: 'long' });
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
        const labels = Array.from(new Set(filterAccounts.map(account => formatDate(account.date))));
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
    }, [filterAccounts, selectedExpenseType]);

    const expenseTypeOptions = [
        { value: 'DepenseCarteBleue', label: 'Dépense Carte Bleue' },
        { value: 'ObtenuCarteBleue', label: 'Obtenu Carte Bleue' },
        { value: 'DeplaceCarteBleueVersLivretA', label: 'Déplacé de Carte Bleue vers Livret A' },
        { value: 'DeplaceLivretAVersCarteBleue', label: 'Déplacé de Livret A vers Carte Bleue' },
        { value: 'ObtenuLivretA', label: 'Obtenu Livret A' },
        { value: 'ObtenuMozaïque', label: 'Obtenu Mozaïque' },
        // Ajoutez d'autres types de dépenses ici
    ];

    const expenseTypeToNames = useMemo(() => {
        return accounts.reduce((acc, account) => {
            expenseTypeOptions.forEach(option => {
                const expenseType = option.value;
                if (!acc[expenseType]) acc[expenseType] = new Set();
                if (account[expenseType] && parseFloat(account[expenseType]) !== 0) {
                    acc[expenseType].add(account.NomDeLaDepense);
                }
            });
            return acc;
        }, {} as { [key: string]: Set<string> });
    }, [accounts]);

    useEffect(() => {
        if (expenseTypeToNames[selectedExpenseType]) {
            setNameOptions(
                Array.from(expenseTypeToNames[selectedExpenseType]).map(name => ({ value: name, label: name }))
            );
        } else {
            setNameOptions([]);
        }
    }, [selectedExpenseType, expenseTypeToNames]);

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
        <div className="account-charts w-2/3  mx-auto p-4 m-4 bg-gray-100 rounded-md text-center">
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
                    options={nameOptions}
                    onChange={handleNameChange}
                    placeholder="Filtrer par nom de la dépense"
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
}

export default AccountCharts;
