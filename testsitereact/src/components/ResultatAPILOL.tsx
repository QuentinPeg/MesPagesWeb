import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Classement {
  position: number;
  equipe: string;
  points: number;
}

const ResultatLOL: React.FC = () => {
  const [ligue, setLigue] = useState<string>('LCS'); // Ligue par défaut
  const [segment, setSegment] = useState<string>('summer'); // Segment par défaut
  const [classement, setClassement] = useState<Classement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`?ligue=${ligue}&segment=${segment}`);
        setClassement(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [ligue, segment]);

  return (
    <div>
      <h2>Résultats League of Legends</h2>
      <div>
        <label htmlFor="ligue">Choisir la ligue :</label>
        <select id="ligue" value={ligue} onChange={(e) => setLigue(e.target.value)}>
          <option value="LCS">LCS</option>
          <option value="LCK">LCK</option>
          {/* Ajoutez d'autres options de ligue selon vos besoins */}
        </select>
      </div>
      <div>
        <label htmlFor="segment">Choisir le segment :</label>
        <select id="segment" value={segment} onChange={(e) => setSegment(e.target.value)}>
          <option value="winter">Hiver</option>
          <option value="spring">Printemps</option>
          <option value="summer">Été</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Équipe</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {classement.map((equipe, index) => (
            <tr key={index}>
              <td>{equipe.position}</td>
              <td>{equipe.equipe}</td>
              <td>{equipe.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultatLOL;
