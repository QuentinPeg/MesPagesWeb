// src/components/AccountForm.tsx
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import parseExtractedText from './parseExtractedText';
import bankingImage from './banking.jpg';
import AccountSummary from './AccountSummary';
import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface AccountFormProps {
  addAccount: (account: Account) => void;
  accounts: Account[];
  livrets: { name: string; obtained: boolean; expense: boolean; move: boolean; moveTo?: string[] }[];
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
  [key: string]: any;
}

const AccountForm: React.FC<AccountFormProps> = ({ addAccount, accounts, livrets }) => {
  const [dateString, setDateString] = useState('');
  const [NomDeLaDepense, setNomDeLaDepense] = useState('');
  const [Categorie, setCategorie] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [dynamicValues, setDynamicValues] = useState<{ [key: string]: string }>({});
  const [ARevoir, setARevoir] = useState('Oui');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleDynamicValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDynamicValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageUploaded(true);
      const { data: { text } } = await Tesseract.recognize(file, 'fra');
      const parsedData = parseExtractedText(text);
      setDateString(parsedData.Date);
      setNomDeLaDepense(parsedData.NomDeLaDepense);
      setSelectedOption(parsedData.selectedOption);
      setDynamicValues(prevValues => ({
        ...prevValues,
        [parsedData.selectedOption]: parsedData.DepenseCarteBleue
      }));
    }
  };

  const ensureColumnExists = async (columnName: string) => {
    try {
      const cleanColumnName = columnName.trim();
      const { error } = await supabase.rpc('check_and_add_column', {
        p_table_name: 'accounts',
        p_column_name: cleanColumnName,
        p_column_type: 'text'
      });

      if (error) throw error;

      const { data, error: fetchError } = await supabase
        .from('accounts')
        .select(cleanColumnName)
        .limit(1);

      if (fetchError) throw fetchError;

    } catch (error) {
      console.error(`Erreur lors de la vérification/ajout de la colonne ${columnName} :`, error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
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
      id: uuidv4(),
      date: formattedDate,
      NomDeLaDepense,
      Categorie,
      DepenseCarteBleue: '',
      ObtenuCarteBleue: '',
      DeplaceCarteBleueVersLivretA: '',
      DeplaceLivretAVersCarteBleue: '',
      ObtenuLivretA: '',
      ObtenuMozaïque: '',
      ARevoir,
      ...dynamicValues
    };

    try {
      await ensureColumnExists('date');
      await ensureColumnExists('NomDeLaDepense');
      await ensureColumnExists('Categorie');
      await ensureColumnExists('DepenseCarteBleue');
      await ensureColumnExists('ObtenuCarteBleue');
      await ensureColumnExists('DeplaceCarteBleueVersLivretA');
      await ensureColumnExists('DeplaceLivretAVersCarteBleue');
      await ensureColumnExists('ObtenuLivretA');
      await ensureColumnExists('ObtenuMozaïque');
      await ensureColumnExists('ARevoir');
      for (const key in dynamicValues) {
        if (dynamicValues.hasOwnProperty(key)) {
          await ensureColumnExists(key);
        }
      }

      if (!user || !user.id) {
        console.error("Erreur: Utilisateur non défini ou non connecté.");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('accounts')
        .insert([{ ...account, user_id: user.id }]);

      if (error) {
        console.error("Erreur lors de l'ajout du compte :", error);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du compte :", error);
    }

    setDateString('');
    setNomDeLaDepense('');
    setCategorie('');
    setSelectedOption('');
    setDynamicValues({});
    setARevoir('Oui');

    setIsImageUploaded(false);

    setIsSubmitting(false);

    setLoading(false);

    navigate('/');
    window.location.reload();
    navigate('/');

  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : accounts
      .map(account => account.Categorie)
      .filter((categorie, index, self) => categorie.toLowerCase().includes(inputValue) && self.indexOf(categorie) === index);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event: React.FormEvent, { suggestion }: { suggestion: string }) => {
    setCategorie(suggestion);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder: "Catégorie",
    value: Categorie,
    onChange: (event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
      setCategorie(newValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 account-form">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="w-full lg:w-3/4 my-auto form-group">
          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='w-full lg:w-1/3 p-2 input-field'>
              <label className="block">Date</label>
              <input
                type="date"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className='w-full lg:w-1/3 p-2 input-field'>
              <label className="block">Nom de la dépense</label>
              <input
                type="text"
                value={NomDeLaDepense}
                onChange={(e) => setNomDeLaDepense(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className='w-full lg:w-1/3 p-2 input-field'>
              <label className="block">Catégorie</label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='w-full lg:w-1/2 p-2 input-field'>
              <label className="block">Type de dépense</label>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="border p-2 w-full"
              >
                <option value="">Sélectionner le type de dépense</option>
                <option value="DepenseCarteBleue">Dépense Carte Bleue</option>
                <option value="ObtenuCarteBleue">Obtenu Carte Bleue</option>
                {livrets.map(livret => (
                  <React.Fragment key={livret.name}>
                    {livret.expense && <option value={`Depense${livret.name}`}>Dépense {livret.name}</option>}
                    {livret.obtained && <option value={`Obtenu${livret.name}`}>Obtenu {livret.name}</option>}
                    {livret.move && livret.moveTo?.map(moveTo => (
                      <option key={`Deplace${livret.name}Vers${moveTo}`} value={`Deplace${livret.name}Vers${moveTo}`}>Déplacé {livret.name} vers {moveTo}</option>
                    ))}
                  </React.Fragment>
                ))}
              </select>
            </div>
            <div className='w-full lg:w-1/2 p-2 input-field'>
              <label className="block">Montant</label>
              <input
                type="number"
                name={selectedOption}
                value={dynamicValues[selectedOption] || ''}
                onChange={handleDynamicValueChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className='my-2'>
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
          {loading && <div className="text-center text-blue-500 mb-4 loading-message">En cours de chargement...</div>}
        </div>

        <div className="w-full lg:w-1/4 file-upload">
          <input type="file" id="imageUpload" onChange={handleImageUpload} style={{ display: 'none' }} />
          <label htmlFor="imageUpload" className="flex flex-col items-center cursor-pointer">
            <span className="block bg-slate-500 text-center py-2 px-4">Cliquez sur l'image pour insérer depuis une image</span>
            <span className="block bg-slate-500 text-center">  ↓  ↓  ↓  </span>
            <img src={bankingImage} alt="Logo" className="preview-image rounded-full mt-2 lg:mt-0 max-w-[100px] sm:max-w-full" />          </label>
        </div>
      </div>
      <AccountSummary accounts={accounts} />
    </form>
  );
};

export default AccountForm;
