import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import fs from 'fs/promises';

// Configuration Supabase
const supabaseUrl = 'https://kbkzeihbxlpsvkjpczms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia3plaWhieGxwc3ZranBjem1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExOTk2NzQsImV4cCI6MjAzNjc3NTY3NH0.fRsuMrxSGlAYFNGhysj46ajeecKWf5IGaJtchtMQA2Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// Chemin vers le fichier CSV
const csvFilePath = './comptetest.csv';

(async () => {
  try {
    // Vider la table 'accounts'
    const { data: existingData, error: fetchError } = await supabase
      .from('accounts')
      .select('id');

    if (fetchError) throw fetchError;

    const deletePromises = existingData.map(record =>
      supabase.from('accounts').delete().eq('id', record.id)
    );

    await Promise.all(deletePromises);
    console.log('Table vidée avec succès.');

    // Lire le fichier CSV
    const csvFile = await fs.readFile(csvFilePath, 'utf8');

    // Parser le fichier CSV
    Papa.parse(csvFile, {
      header: true,
      delimiter: ';',
      complete: async (result) => {
        const data = result.data;
        let importSuccess = true;

        for (const record of data) {
          // Afficher les valeurs lues pour vérification

          const account = {
            date: record['Date'],
            NomDeLaDepense: record['Nom de la dépense'],
            Categorie: record['Catégorie'],
            DepenseCarteBleue: record['Dpense Carte Bleue'],
            ObtenuCarteBleue: record['Obtenu Carte Bleue'],
            DeplaceCarteBleueVersLivretA: record['Dplac Carte Bleu --> Livret A'],
            DeplaceLivretAVersCarteBleue: record['Dplac Livret A --> Carte Bleu'],
            ObtenuLivretA: record['Obtenu livret A'],
            ObtenuMozaïque: record['Obtenu Mozaque'],
            ARevoir: record['A revoir']
          };

          const { error: insertError } = await supabase
            .from('accounts')
            .insert(account);

          if (insertError) {
            console.error('Erreur lors de l\'ajout du compte :', insertError);
            importSuccess = false;
          }
        }

        if (importSuccess) {
          console.log('Importation réussie.');
        } else {
          console.log('Importation échouée.');
        }
      },
      error: (error) => {
        console.error('Erreur lors du parsing du CSV :', error);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier CSV :', error);
  }
})();
