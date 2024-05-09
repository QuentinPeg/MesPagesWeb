var panierAffiche = false;
var nombreArticlesPanier = 0;

function togglePanier(e) {
    e.stopPropagation();

    var panierFenetre = document.getElementById('panier-fenetre');
    panierAffiche = !panierAffiche;

    if (panierAffiche) {
        panierFenetre.style.display = 'block';
        document.addEventListener('click', fermerPanierSiClicExterieur);
    } else {
        panierFenetre.style.display = 'none';
        document.removeEventListener('click', fermerPanierSiClicExterieur);
    }
}

function fermerPanierSiClicExterieur(e) {
    var panierFenetre = document.getElementById('panier-fenetre');

    if (!panierFenetre.contains(e.target)) {
        panierAffiche = false;
        panierFenetre.style.display = 'none';
        document.removeEventListener('click', fermerPanierSiClicExterieur);
    }
}

function ajouterAuPanier(nomArticle) {
    var panierListe = document.getElementById('panier-liste');
    var nouvelArticle = document.createElement('li');

    // Ajout du bouton de suppression avec un appel à la fonction supprimerArticle
    nouvelArticle.innerHTML = `
          ${nomArticle}
          <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>
        `;

    panierListe.appendChild(nouvelArticle);

    // Mettre à jour le panier (vous devez avoir une structure de données pour stocker les articles du panier)
    var panier = ['Pack intégral', /* Ajoutez d'autres articles ici */];

    // Ajouter l'article au panier s'il n'est pas déjà présent
    if (!panier.includes(nomArticle)) {
        panier.push(nomArticle);
    }

    // Mettre à jour le nombre d'articles dans la bulle du panier
    nombreArticlesPanier++;
    mettreAJourNombreArticlesPanier();
    document.getElementById('panier-bulle').textContent = nombreArticlesPanier;
}

function supprimerArticle(event, boutonSupprimer) {
    var panierListe = document.getElementById('panier-liste');
    var elementASupprimer = boutonSupprimer.parentNode;

    if (elementASupprimer) {
        panierListe.removeChild(elementASupprimer);

        // Mettre à jour le nombre d'articles dans la bulle du panier
        nombreArticlesPanier--;
        mettreAJourNombreArticlesPanier();
    }

    // Si la liste est vide, masquer la fenêtre flottante du panier
    if (panierListe.childElementCount === 0) {
        masquerPanier();
    }

    // Empêcher la propagation du clic au conteneur du panier
    event.stopPropagation();
}

function masquerPanier() {
    var panierFenetre = document.getElementById('panier-fenetre');
    panierFenetre.style.display = 'none';
    document.removeEventListener('click', fermerPanierSiClicExterieur);
}

function afficherPanier() {
    var panierFenetre = document.getElementById('panier-fenetre');
    panierFenetre.style.display = 'block';
    document.addEventListener('click', fermerPanierSiClicExterieur);
}

function mettreAJourNombreArticlesPanier() {
    var nombreArticlesPanier = document.getElementById('panier-liste').childElementCount;
    var bullePanier = document.getElementById('panier-bulle');

    // Mettre à jour le contenu de la bulle avec le nombre d'articles
    bullePanier.textContent = nombreArticlesPanier;

    // Afficher ou masquer la bulle en fonction du nombre d'articles
    bullePanier.style.display = nombreArticlesPanier > 0 ? 'block' : 'none';
}

document.querySelector('.panier-link').addEventListener('click', togglePanier);

function precommander() {
    var panierListe = document.getElementById('panier-liste');
    var articlesPanier = panierListe.getElementsByTagName('li');

    // Créez un formulaire dynamique
    var formulaire = document.createElement('form');
    formulaire.action = 'https://docs.google.com/forms/d/e/1FAIpQLSfWDd74qyw3fTTBXI88uM-EmEJb-DALeF_V3ArDfO3nvha11A/viewform?usp=sf_link'; // Remplacez par l'URL de votre page de précommande
    formulaire.method = 'post';

    // Ajoutez les éléments au formulaire
    for (var i = 0; i < articlesPanier.length; i++) {
        var article = articlesPanier[i].textContent.trim();

        // Ajoutez des champs de texte pour chaque article
        var champNom = creerChampTexte('Nom', article);
        var champPrenom = creerChampTexte('Prénom', article);
        var champEmail = creerChampTexte('Email', article);
        var champNumero = creerChampTexte('Numero', article);
        var champAdresse = creerChampTexte('Adresse', article);
        var champCodePostale = creerChampTexte('CodePostale', article);

        // Ajoutez la structure du tableau pour chaque article
        var tableau = document.createElement('table');
        var ligne = tableau.insertRow();

        var cellule1 = ligne.insertCell(0);
        cellule1.innerHTML = `<label for="${article}" class="article">${article}</label>
                              <input type="checkbox" id="${article}" name="${article}" value="${article}" checked>`;

        var cellule2 = ligne.insertCell(1);
        cellule2.innerHTML = `<label for="choixFormat${i + 1}" class="article">Format :</label>
                              <select id="choixFormat${i + 1}" name="choixFormat${i + 1}">
                                  <option value="option1">A5</option>
                                  <option value="option2">A6</option>
                              </select>`;

        var cellule3 = ligne.insertCell(2);
        cellule3.innerHTML = `<label for="xd${i + 1}" class="article">Plastifié :</label>
                              <select id="xd${i + 1}" name="xd${i + 1}" class="article">
                                  <option value="option1">Non</option>
                                  <option value="option2">Oui</option>
                              </select>`;

        // Ajoutez les champs au formulaire
        formulaire.appendChild(champNom);
        formulaire.appendChild(champPrenom);
        formulaire.appendChild(champEmail);
        formulaire.appendChild(champNumero);
        formulaire.appendChild(champAdresse);
        formulaire.appendChild(champCodePostale);
        formulaire.appendChild(tableau);
    }

    // Ajoutez le formulaire à la page et soumettez-le
    document.body.appendChild(formulaire);
    formulaire.submit();
}

// Fonction pour créer un champ de texte avec un ID basé sur l'article
function creerChampTexte(nom, article) {
    var champ = document.createElement('input');
    champ.type = 'text';
    champ.id = `${nom}_${article.replace(/\s+/g, '')}`; // Remplacez les espaces pour l'ID
    champ.name = `${nom}_${article.replace(/\s+/g, '')}`;
    champ.placeholder = `${nom}*`;
    champ.required = true;

    return champ;
}
