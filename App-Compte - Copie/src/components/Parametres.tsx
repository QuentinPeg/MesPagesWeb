import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { FaPen } from 'react-icons/fa';

interface Livret {
  id: string;
  name: string;
  obtained: boolean;
  expense: boolean;
  move: boolean;
  moveTo?: string[];
}

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    livrets?: Livret[];
    columnOrder?: string[];
  };
}

const Parametres: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [livrets, setLivrets] = useState<Livret[]>([]);
  const [newLivret, setNewLivret] = useState<string>('');
  const [columnOrder, setColumnOrder] = useState<string[]>(['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);
  const [editingLivret, setEditingLivret] = useState<number | null>(null);
  const [editedLivretName, setEditedLivretName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
        return;
      }
      const user = data.user;
      setUser(user as User | null);
      setFullName(user?.user_metadata?.full_name || '');

      const existingLivrets = user?.user_metadata?.livrets || [];
      const migratedLivrets = existingLivrets.map((livret: Livret) => ({
        ...livret,
        id: livret.id || `${livret.name}-${Date.now()}`
      }));

      const hasCarteBleue = migratedLivrets.some((livret: Livret) => livret.id === 'CarteBleue-Initial');
      if (!hasCarteBleue) {
        migratedLivrets.push({ id: 'CarteBleue-Initial', name: 'CarteBleue', obtained: false, expense: false, move: false });
      }

      setLivrets(migratedLivrets);
      setColumnOrder(user?.user_metadata?.columnOrder || ['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmSave = window.confirm('Êtes-vous sûr de vouloir sauvegarder les modifications ?');
    if (!confirmSave) {
      return;
    }

    if (!user) {
      console.error('Utilisateur non authentifié');
      return;
    }

    const hasDuplicateColumns = columnOrder.some((column, index) => columnOrder.indexOf(column) !== index);
    if (hasDuplicateColumns) {
      alert('Chaque colonne doit être unique. Veuillez vérifier l’ordre des colonnes.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        livrets: livrets,
        columnOrder: columnOrder,
      },
    });

    if (error) {
      console.error('Erreur lors de la mise à jour des informations de l’utilisateur :', error);
      return;
    }

    setUser((prevUser: any) => ({
      ...prevUser,
      user_metadata: {
        ...prevUser.user_metadata,
        full_name: fullName,
        livrets: livrets,
        columnOrder: columnOrder,
      },
    }));

    window.location.reload();
  };

  const handleColumnOrderChange = (index: number, newColumn: string) => {
    const newOrder = [...columnOrder];
    newOrder[index] = newColumn;
    setColumnOrder(newOrder);
  };

  const addColumn = () => {
    const newOrder = [...columnOrder];
    const secondLastIndex = newOrder.length - 1;
    newOrder.splice(secondLastIndex, 0, 'date');
    setColumnOrder(newOrder);
  };

  const deleteColumn = (index: number) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette colonne ?');
    if (confirmDelete) {
      setColumnOrder(columnOrder.filter((_, i) => i !== index));
    }
  };

  const displayLivretName = (name: string) => {
    return name.replace(/CarteBleue/, 'Carte Bleue');
  };

  const internalLivretName = (name: string) => {
    return name.replace(/Carte Bleue/, 'CarteBleue');
  };

  const addLivret = () => {
    if (newLivret && !livrets.find(l => l.name === internalLivretName(newLivret))) {
      const newId = `${internalLivretName(newLivret)}-${Date.now()}`;
      setLivrets([...livrets, { id: newId, name: internalLivretName(newLivret), obtained: false, expense: false, move: false }]);
      setNewLivret('');
    }
  };

  const deleteLivret = (livretId: string) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce livret ?');
    if (confirmDelete) {
      setLivrets(livrets.filter(l => l.id !== livretId));
    }
  };

  const handleLivretChange = (index: number, field: 'obtained' | 'expense' | 'move', value: boolean) => {
    const updatedLivrets = [...livrets];
    updatedLivrets[index][field] = value;
    setLivrets(updatedLivrets);
  };

  const handleMoveToChange = (index: number, targetName: string, checked: boolean) => {
    const updatedLivrets = [...livrets];
    const currentLivret = updatedLivrets[index];
    if (checked) {
      if (!currentLivret.moveTo) {
        currentLivret.moveTo = [];
      }
      if (!currentLivret.moveTo.includes(targetName)) {
        currentLivret.moveTo.push(targetName);
      }
    } else {
      if (currentLivret.moveTo) {
        currentLivret.moveTo = currentLivret.moveTo.filter(name => name !== targetName);
      }
    }
    setLivrets(updatedLivrets);
  };

  const validateLivrets = () => {
    return livrets.every(livret => livret.obtained || livret.expense || livret.move);
  };

  const handleEditLivret = (index: number) => {
    setEditingLivret(index);
    setEditedLivretName(livrets[index].name);
  };

  const handleSaveLivretName = (index: number) => {
    const updatedLivrets = [...livrets];
    updatedLivrets[index].name = internalLivretName(editedLivretName);
    setLivrets(updatedLivrets);
    setEditingLivret(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl mb-4">Paramètres du compte</h2>
      {user && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4">
              <div className="mb-4">
                <label>Email</label>
                <input type="email" value={user.email} disabled className="border p-2 w-full" />
              </div>
              <div className="mb-4">
                <label>Nom</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label>Mes Livrets</label>
              <div className="grid gap-4 items-center">
                {livrets.map((livret, index) => (
                  <div key={livret.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 sm:col-span-2 flex items-center gap-2">
                      {editingLivret === index ? (
                        <>
                          <input
                            type="text"
                            value={editedLivretName}
                            onChange={(e) => setEditedLivretName(e.target.value)}
                            className="border p-2"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveLivretName(index)}
                            className="bg-blue-500 text-white p-2 rounded bg-opacity-60 z-10"
                          >
                            Sauvegarder
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="font-bold">{displayLivretName(livret.name)}</span>
                          <FaPen onClick={() => handleEditLivret(index)} className="cursor-pointer text-blue-500" />
                        </>
                      )}
                    </div>
                    <label className="col-span-6 sm:col-span-2 flex items-center">
                      Obtenu
                      <input
                        type="checkbox"
                        checked={livret.obtained}
                        onChange={(e) => handleLivretChange(index, 'obtained', e.target.checked)}
                        className="ml-1"
                      />
                    </label>
                    <label className="col-span-6 sm:col-span-2 flex items-center">
                      Dépense
                      <input
                        type="checkbox"
                        checked={livret.expense}
                        onChange={(e) => handleLivretChange(index, 'expense', e.target.checked)}
                        className="ml-1"
                      />
                    </label>
                    <label className="col-span-6 sm:col-span-2 flex items-center">
                      Déplacer vers
                      <input
                        type="checkbox"
                        checked={livret.move}
                        onChange={(e) => handleLivretChange(index, 'move', e.target.checked)}
                        className="ml-1"
                      />
                    </label>
                    <div className="col-span-12 sm:col-span-2">
                      {livret.move ? (
                        <div>
                          {livrets.filter((_, i) => i !== index).map(l => (
                            <label key={l.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={livret.moveTo?.includes(l.name) || false}
                                onChange={(e) => handleMoveToChange(index, l.name, e.target.checked)}
                              />
                              {displayLivretName(l.name)}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    {livret.id !== 'CarteBleue-Initial' ? ( 
                      <button
                        type="button"
                        onClick={() => deleteLivret(livret.id)}
                        className="col-span-12 sm:col-span-1 bg-red-800 text-white px-2 py-1 rounded ml-2"
                      >
                        Supprimer
                      </button>
                    ) : (
                      <div className="col-span-12 sm:col-span-1"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className='flex flex-col w-fit p-2 mx-auto gap-3'>
                <input
                  type="text"
                  value={newLivret}
                  onChange={(e) => setNewLivret(e.target.value)}
                  className="border p-2 mb-2"
                  placeholder="Ajouter un nouveau livret"
                />
                <button className='bg-green-600 text-white p-2 rounded' type="button" onClick={addLivret}>Ajouter Livret</button>
              </div>
            </div>
            <div className="mb-4">
              <label>Ordre des Colonnes</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto mb-4">
                {columnOrder.map((column, index) => (
                  <div key={index} className="flex items-center mb-2 gap-4 max-sm:gap-1 max-sm:justify-end mx-auto max-sm:w-[90vw]">
                    <span>{index + 1}.</span>
                    <select
                      value={column}
                      onChange={(e) => handleColumnOrderChange(index, e.target.value)}
                      className="border p-2 min-w-max max-w-xs"
                    >
                      <option value="date">Date</option>
                      <option value="NomDeLaDepense">Nom de la dépense</option>
                      <option value="Categorie">Catégorie</option>
                      <option value="ARevoir">A revoir</option>
                      {livrets.map(livret => livret.obtained && (
                        <option key={'Obtenu' + livret.name} value={'Obtenu' + livret.name}>Obtenu {displayLivretName(livret.name)}</option>
                      ))}
                      {livrets.map(livret => livret.expense && (
                        <option key={'Depense' + livret.name} value={'Depense' + livret.name}>Dépense {displayLivretName(livret.name)}</option>
                      ))}
                      {livrets.map(livret => livret.move && livret.moveTo?.map(moveTo => (
                        <option key={'Deplace' + livret.name + 'Vers' + internalLivretName(moveTo)} value={'Deplace' + livret.name + 'Vers' + internalLivretName(moveTo)}>
                          Déplacer {displayLivretName(livret.name)} vers {displayLivretName(moveTo)}
                        </option>
                      )))}
                    </select>
                    <button
                      type="button"
                      onClick={() => deleteColumn(index)}
                      className="bg-red-500 text-white p-2 ml-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addColumn}
                className="bg-green-600 text-white px-4 py-2 rounded-full mt-2"
              >
                +
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={!validateLivrets()}
            >
              Mettre à jour
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Parametres;
