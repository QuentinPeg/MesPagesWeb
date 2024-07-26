import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import parseExtractedText from './parseExtractedText';
import bankingImage from './banking.jpg';
import AccountSummary from './AccountSummary';
import { supabase } from '../supabase'; // Importez Supabase

interface AccountFormProps {
  addAccount: (account: Account) => void;
  accounts: Account[];
}

interface Account {
  id: string;
  date: string;
  NomDeLaDepense: string;
  Categorie: string;
  DepenseCarteBleue: string;
  ObtenuCarteBleue: string;
  DeplaceCarteBleueVersLivretA: string;
  DeplaceLivretAVersCarteBleue: string;
  ObtenuLivretA: string;
  ObtenuMozaïque: string;
  ARevoir: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ addAccount, accounts }) => {
  const [dateString, setDateString] = useState('');
  const [NomDeLaDepense, setNomDeLaDepense] = useState('');
  const [Categorie, setCategorie] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [DepenseCarteBleue, setDepenseCarteBleue] = useState('');
  const [ObtenuCarteBleue, setObtenuCarteBleue] = useState('');
  const [DeplaceCarteBleueVersLivretA, setDeplaceCarteBleueVersLivretA] = useState('');
  const [DeplaceLivretAVersCarteBleue, setDeplaceLivretAVersCarteBleue] = useState('');
  const [ObtenuLivretA, setObtenuLivretA] = useState('');
  const [ObtenuMozaïque, setObtenuMozaïque] = useState('');
  const [ARevoir, setARevoir] = useState('Oui');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageUploaded(true);
      const { data: { text } } = await Tesseract.recognize(file, 'fra');
      const parsedData = parseExtractedText(text);
      setDateString(parsedData.Date);
      setNomDeLaDepense(parsedData.NomDeLaDepense);
      setDepenseCarteBleue(parsedData.DepenseCarteBleue.trim());
      setSelectedOption(parsedData.selectedOption);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if ((!dateString || !NomDeLaDepense || !Categorie || !selectedOption) && !isImageUploaded) {
      alert("Veuillez remplir au minimum la date, le nom de la dépense, la catégorie et sélectionner un type de dépense, ou télécharger une image.");
      return;
    }

    setIsSubmitting(true);

    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    let account: Account = {
      id: '',
      date: formattedDate,
      NomDeLaDepense,
      Categorie,
      DepenseCarteBleue: '',
      ObtenuCarteBleue: '',
      DeplaceCarteBleueVersLivretA: '',
      DeplaceLivretAVersCarteBleue: '',
      ObtenuLivretA: '',
      ObtenuMozaïque: '',
      ARevoir
    };

    switch (selectedOption) {
      case 'Dépense Carte Bleue':
        account.DepenseCarteBleue = DepenseCarteBleue;
        break;
      case 'Obtenu Carte Bleue':
        account.ObtenuCarteBleue = ObtenuCarteBleue;
        break;
      case 'Déplacé Carte Bleue vers Livret A':
        account.DeplaceCarteBleueVersLivretA = DeplaceCarteBleueVersLivretA;
        break;
      case 'Déplacé Livret A vers Carte Bleue':
        account.DeplaceLivretAVersCarteBleue = DeplaceLivretAVersCarteBleue;
        break;
      case 'Obtenu livret A':
        account.ObtenuLivretA = ObtenuLivretA;
        break;
      case 'Obtenu Mozaïque':
        account.ObtenuMozaïque = ObtenuMozaïque;
        break;
      default:
        break;
    }

    try {
      const { data: countData, error: countError } = await supabase
        .from('accounts')
        .select('id', { count: 'exact' });

      if (countError) {
        console.error("Erreur lors de la récupération du nombre de comptes :", countError);
        setIsSubmitting(false);
        return;
      }

      const newId = (countData.length + 1).toString();
      account.id = newId;

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('date', formattedDate)
        .eq('NomDeLaDepense', NomDeLaDepense)
        .eq('Categorie', Categorie);

      if (error) {
        console.error("Erreur lors de la récupération des comptes :", error);
        setIsSubmitting(false);
        return;
      }

      addAccount(account);

    } catch (error) {
      console.error("Erreur lors de l'ajout du compte :", error);
    }

    setDateString('');
    setNomDeLaDepense('');
    setCategorie('');
    setSelectedOption('');
    setDepenseCarteBleue('');
    setObtenuCarteBleue('');
    setDeplaceCarteBleueVersLivretA('');
    setDeplaceLivretAVersCarteBleue('');
    setObtenuLivretA('');
    setObtenuMozaïque('');
    setARevoir('Oui');
    setIsImageUploaded(false);
    setIsSubmitting(false);

  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex row">
        <div className="w-3/4 my-auto">
          <div className='flex gap-5'>
            <div className='w-1/3 p-2'>
              <label className="block">Date</label>
              <input
                type="date"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className='w-1/3 p-2'>
              <label className="block">Nom de la dépense</label>
              <input
                type="text"
                value={NomDeLaDepense}
                onChange={(e) => setNomDeLaDepense(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className='w-1/3 p-2'>
              <label className="block">Catégorie</label>
              <input
                type="text"
                value={Categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <div className='flex gap-5'>
            <div className='w-1/2 p-2'>
              <label className="block">Type de dépense</label>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="border p-2 w-full"
              >
                <option value="">Sélectionner le type de dépense</option>
                <option value="Dépense Carte Bleue">Dépense Carte Bleue</option>
                <option value="Obtenu Carte Bleue">Obtenu Carte Bleue</option>
                <option value="Déplacé Carte Bleue vers Livret A">Déplacé Carte Bleue vers Livret A</option>
                <option value="Déplacé Livret A vers Carte Bleue">Déplacé Livret A vers Carte Bleue</option>
                <option value="Obtenu livret A">Obtenu livret A</option>
                <option value="Obtenu Mozaïque">Obtenu Mozaïque</option>
              </select>
            </div>
            <div className='w-1/2 p-2'>
              <label className="block">Montant</label>
              <input
                type="number"
                value={selectedOption === 'Dépense Carte Bleue' ? DepenseCarteBleue :
                  selectedOption === 'Obtenu Carte Bleue' ? ObtenuCarteBleue :
                    selectedOption === 'Déplacé Carte Bleue vers Livret A' ? DeplaceCarteBleueVersLivretA :
                      selectedOption === 'Déplacé Livret A vers Carte Bleue' ? DeplaceLivretAVersCarteBleue :
                        selectedOption === 'Obtenu livret A' ? ObtenuLivretA :
                          selectedOption === 'Obtenu Mozaïque' ? ObtenuMozaïque : ''}
                onChange={(e) => {
                  switch (selectedOption) {
                    case 'Dépense Carte Bleue':
                      setDepenseCarteBleue(e.target.value);
                      break;
                    case 'Obtenu Carte Bleue':
                      setObtenuCarteBleue(e.target.value);
                      break;
                    case 'Déplacé Carte Bleue vers Livret A':
                      setDeplaceCarteBleueVersLivretA(e.target.value);
                      break;
                    case 'Déplacé Livret A vers Carte Bleue':
                      setDeplaceLivretAVersCarteBleue(e.target.value);
                      break;
                    case 'Obtenu livret A':
                      setObtenuLivretA(e.target.value);
                      break;
                    case 'Obtenu Mozaïque':
                      setObtenuMozaïque(e.target.value);
                      break;
                    default:
                      break;
                  }
                }}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block">
              A revoir
              <input
                type="checkbox"
                checked={ARevoir === 'Oui'}
                onChange={(e) => setARevoir(e.target.checked ? 'Oui' : '')}
                className="ml-2"
              />
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 mt-2">
            Ajouter
          </button>
        </div>

        <div className="w-1/4">
          <input type="file" id="imageUpload" onChange={handleImageUpload} style={{ display: 'none' }} />
          <label htmlFor="imageUpload">
            <span className="block bg-slate-500">Clicker sur l'image pour insérer depuis une image</span>
            <span className="block bg-slate-500 text-center">  ↓  ↓  ↓  </span>
            <img src={bankingImage} alt="Logo" className="preview-image rounded-full" style={{ cursor: 'pointer' }} />
          </label>
        </div>
      </div>
      <AccountSummary accounts={accounts} />
    </form>
  );
};

export default AccountForm;
