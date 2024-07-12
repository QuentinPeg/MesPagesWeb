import React, { useState } from 'react';

interface AccountFormProps {
  addAccount: (account: Account) => void;
}

interface Account {
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

const AccountForm: React.FC<AccountFormProps> = ({ addAccount }) => {
  const [Date, setDate] = useState('');
  const [NomDeLaDepense, setNomDeLaDepense] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [DepenseCarteBleue, setDepenseCarteBleue] = useState('');
  const [ObtenuCarteBleue, setObtenuCarteBleue] = useState('');
  const [DeplaceCarteBleueVersLivretA, setDeplaceCarteBleueVersLivretA] = useState('');
  const [DeplaceLivretAVersCarteBleue, setDeplaceLivretAVersCarteBleue] = useState('');
  const [ObtenuLivretA, setObtenuLivretA] = useState('');
  const [ObtenuMozaïque, setObtenuMozaïque] = useState('');
  const [ARevoir, setARevoir] = useState('');

  // Fonction pour formater la date de "YYYY-MM-DD" à "DD/MM/YY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    let year = date.getFullYear().toString().substr(-2);

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;
 
    return [day, month, year].join('/');
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!Date || !NomDeLaDepense || !selectedOption) {
      alert("Veuillez remplir au minimum la date, le nom de la dépense et sélectionner un type de dépense.");
      return;
    }

    let account: Account = {
      Date: formatDate(Date),
      NomDeLaDepense,
      DepenseCarteBleue: '',
      ObtenuCarteBleue: '',
      DeplaceCarteBleueVersLivretA: '',
      DeplaceLivretAVersCarteBleue: '',
      ObtenuLivretA: '',
      ObtenuMozaïque: '',
      ARevoir
    };

    // Assigner la valeur au champ approprié selon l'option sélectionnée
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

    addAccount(account);

    // Réinitialiser les champs après soumission
    setDate('');
    setNomDeLaDepense('');
    setSelectedOption('');
    setDepenseCarteBleue('');
    setObtenuCarteBleue('');
    setDeplaceCarteBleueVersLivretA('');
    setDeplaceLivretAVersCarteBleue('');
    setObtenuLivretA('');
    setObtenuMozaïque('');
    setARevoir('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 ">
      <div className='flex gap-5'>
        <div className='w-1/2 p-2'>
          <label className="block">Date</label>
          <input
            type="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className='w-1/2 p-2'>
          <label className="block">Nom de la dépense</label>
          <input
            type="text"
            value={NomDeLaDepense}
            onChange={(e) => setNomDeLaDepense(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>
      <div>
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
      <div>
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
      <div>
        <label className="block">A revoir</label>
        <select
          value={ARevoir}
          onChange={(e) => setARevoir(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Oui" selected>Oui</option>
          <option value="">Non</option>

        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 mt-2">
        Ajouter
      </button>
    </form>
  );
};

export default AccountForm;
