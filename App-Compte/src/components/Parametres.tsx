import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    livrets?: { name: string, obtained: boolean, expense: boolean, move: boolean, moveTo?: string[] }[];
    columnOrder?: string[];
  };
}

const Parametres: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [livrets, setLivrets] = useState<{ name: string, obtained: boolean, expense: boolean, move: boolean, moveTo?: string[] }[]>([]);
  const [newLivret, setNewLivret] = useState<string>('');
  const [columnOrder, setColumnOrder] = useState<string[]>(['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
        return;
      }
      const user = data.user;
      setUser(user);
      setFullName(user?.user_metadata?.full_name || '');

      const existingLivrets = user?.user_metadata?.livrets || [];
      const hasCarteBleue = existingLivrets.some(livret => livret.name === 'CarteBleue');
      if (!hasCarteBleue) {
        existingLivrets.push({ name: 'CarteBleue', obtained: false, expense: false, move: false });
      }
      setLivrets(existingLivrets);

      setColumnOrder(user?.user_metadata?.columnOrder || ['date', 'NomDeLaDepense', 'Categorie', 'ARevoir']);
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error('Utilisateur non authentifié');
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

    alert('Informations mises à jour avec succès');
    window.location.reload();
  };

  const handleColumnOrderChange = (index: number, newColumn: string) => {
    const newOrder = [...columnOrder];
    newOrder[index] = newColumn;
    setColumnOrder(newOrder);
  };

  const addColumn = () => {
    setColumnOrder([...columnOrder, 'date']);
  };

  const deleteColumn = (index: number) => {
    setColumnOrder(columnOrder.filter((_, i) => i !== index));
  };

  const displayLivretName = (name: string) => {
    if (name === 'CarteBleue') return 'Carte Bleue';
    return name;
  };

  const internalLivretName = (name: string) => {
    if (name === 'Carte Bleue') return 'CarteBleue';
    return name;
  };

  const addLivret = () => {
    const internalName = internalLivretName(newLivret);
    if (newLivret && internalName !== 'CarteBleue' && !livrets.find(l => l.name === internalName)) {
      setLivrets([...livrets, { name: internalName, obtained: false, expense: false, move: false }]);
      setNewLivret('');
    } else if (internalName === 'CarteBleue') {
      alert('Le livret "Carte Bleue" ne peut pas être ajouté de nouveau.');
    }
  };

  const deleteLivret = (livretName: string) => {
    if (livretName === 'CarteBleue') {
      alert('Le livret "Carte Bleue" ne peut pas être supprimé.');
      return;
    }
    setLivrets(livrets.filter(l => l.name !== livretName));
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

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Paramètres du compte</h2>
      {user && (
        <form onSubmit={handleUpdate}>
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
          <div className="mb-4">
            <label>Ordre des Colonnes</label>
            {columnOrder.map((column, index) => (
              <div key={index} className="mb-2 flex items-center">
                <select
                  value={column}
                  onChange={(e) => handleColumnOrderChange(index, e.target.value)}
                  className="border p-2 w-full"
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
                    <option key={'Deplace' + livret.name + 'Vers' + internalLivretName(moveTo)} value={'Deplace' + livret.name + 'Vers' + internalLivretName(moveTo)}>Déplacer {displayLivretName(livret.name)} vers {displayLivretName(moveTo)}</option>
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
            <button
              type="button"
              onClick={addColumn}
              className="bg-blue-500 text-white p-2 rounded mb-2"
            >
              +
            </button>
          </div>
          <div className="mb-4">
            <label>Mes Livrets</label>
            <div>
              {livrets.map((livret, index) => (
                <div key={livret.name} className="flex flex-row mb-2 gap-4">
                  <span className="font-bold my-auto">{displayLivretName(livret.name)}</span>
                  <label className="mr-2 my-auto">
                    Obtenu
                    <input
                      type="checkbox"
                      checked={livret.obtained}
                      onChange={(e) => handleLivretChange(index, 'obtained', e.target.checked)}
                      className="ml-1 my-auto"
                    />
                  </label>
                  <label className="mr-2 my-auto">
                    Dépense
                    <input
                      type="checkbox"
                      checked={livret.expense}
                      onChange={(e) => handleLivretChange(index, 'expense', e.target.checked)}
                      className="ml-1 my-auto"
                    />
                  </label>
                  <label className="mr-2 my-auto">
                    Déplacer vers
                    <input
                      type="checkbox"
                      checked={livret.move}
                      onChange={(e) => handleLivretChange(index, 'move', e.target.checked)}
                      className="ml-1 my-auto"
                    />
                  </label>
                  {livret.move && (
                    <div className="ml-2 my-auto">
                      {livrets.filter((_, i) => i !== index).map(l => (
                        <label key={l.name} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={livret.moveTo?.includes(l.name) || false}
                            onChange={(e) => handleMoveToChange(index, l.name, e.target.checked)}
                          />
                          {displayLivretName(l.name)}
                        </label>
                      ))}
                    </div>
                  )}
                  {livret.name !== 'CarteBleue' && (
                    <button type="button" onClick={() => deleteLivret(livret.name)} className="ml-2 h-fit my-auto">Supprimer</button>
                  )}
                </div>
              ))}
              <input
                type="text"
                value={newLivret}
                onChange={(e) => setNewLivret(e.target.value)}
                className="border p-2 w-full mb-2"
                placeholder="Ajouter un nouveau livret"
              />
              <button type="button" onClick={addLivret}>Ajouter Livret</button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={!validateLivrets()}
          >
            Mettre à jour
          </button>
        </form>
      )}
    </div>
  );
};

export default Parametres;
