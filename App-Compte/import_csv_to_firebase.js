// File: import_csv_to_firebase.js

import admin from 'firebase-admin';
import csv from 'csv-parser';
import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// 1. Initialiser Firebase avec le fichier de clé privée
const serviceAccount = JSON.parse(fs.readFileSync('./firebase_credentials.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Configuration Firebase pour la seconde partie du script
const firebaseConfig = {
  apiKey: "AIzaSyCmp6sPPgX5pc200A7LqUc2Nm5MurJbC3U",
  authDomain: "compte-test-1.firebaseapp.com",
  projectId: "compte-test-1",
  storageBucket: "compte-test-1.appspot.com",
  messagingSenderId: "413778579886",
  appId: "1:413778579886:web:ac79f8cf5440661215b83f",
  measurementId: "G-8CMRRN81PK"
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

// 3. Fonction pour vider la collection
const clearCollection = async (collectionName) => {
  const collectionRef = collection(firestoreDb, collectionName);
  const snapshot = await getDocs(collectionRef);
  const deletePromises = [];
  snapshot.forEach((doc) => {
    deletePromises.push(deleteDoc(doc.ref));
  });
  await Promise.all(deletePromises);
  console.log(`Collection '${collectionName}' vidée.`);
};


// 4. Lire le fichier CSV et importer les données
const csvFilePath = './comptetest.csv';
const collectionName = 'accounts';

const importData = async () => {
  await clearCollection(collectionName); // Vider la collection avant d'importer de nouvelles données

  fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ';' }))
    .on('data', async (row) => {
      if (Object.values(row).some(value => value.trim() !== '')) {
        try {
          await addDoc(collection(firestoreDb, collectionName), row);
          console.log('Document successfully written!');
        } catch (error) {
          console.error('Error writing document: ', error);
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

importData().then(() => {
  console.log('Importation terminée');
}).catch(error => {
  console.error('Erreur lors de l\'importation des données :', error);
});
