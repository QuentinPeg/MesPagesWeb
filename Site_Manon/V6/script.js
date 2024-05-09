var panierAffiche = false;
var nombreArticlesPanier = 0;
var panier = [];

// Chargez le panier depuis localStorage au chargement de la page
window.addEventListener('load', function() {
    var panierEnregistre = localStorage.getItem('panier');
    if (panierEnregistre) {
        panier = JSON.parse(panierEnregistre);
        afficherRecapArticles();
    }
});

function togglePanier(e) {
    e.stopPropagation();

    var panierFenetre = document.getElementById('panier-fenetre');
    var precommandeFenetre = document.getElementById('precommande-fenetre');
    panierAffiche = !panierAffiche;

    if (panierAffiche) {
        panierFenetre.style.display = 'block';
        precommandeFenetre.style.display = 'none'; // Masquer la précommande lors de l'ouverture du panier
    } else {
        panierFenetre.style.display = 'none';
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
          <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>`;

    panierListe.appendChild(nouvelArticle);

    // Ajouter l'article au panier s'il n'est pas déjà présent
    panier.push(nomArticle);

    // Stockez le panier dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettre à jour le nombre d'articles dans la bulle du panier
    nombreArticlesPanier++;
    mettreAJourNombreArticlesPanier();
    document.getElementById('panier-bulle').textContent = nombreArticlesPanier;

    // Appel pour mettre à jour le total
    calculerTotal();

}

function supprimerArticle(event, boutonSupprimer) {
    var panierListe = document.getElementById('panier-liste');
    var elementASupprimer = boutonSupprimer.parentNode;

    if (elementASupprimer) {
        var nomArticle = elementASupprimer.firstChild.textContent.trim(); // Récupérer le nom de l'article
        panierListe.removeChild(elementASupprimer);

        // Supprimer l'article correspondant du panier
        var index = panier.indexOf(nomArticle);
        if (index !== -1) {
            panier.splice(index, 1);
        }
        // Mettre à jour le nombre d'articles dans la bulle du panier
        nombreArticlesPanier--;
        mettreAJourNombreArticlesPanier();
        
        // Stockez le panier dans localStorage
        localStorage.setItem('panier', JSON.stringify(panier));

        // Mettre à jour le total
        calculerTotal();

        // Appel pour mettre à jour le récapitulatif après la suppression
        afficherRecapArticles();
    }

    // Si la liste est vide, masquer la fenêtre flottante du panier
    if (panierListe.childElementCount === 0) {
        masquerPanier();
    }

    // Empêcher la propagation du clic au conteneur du panier
    event.stopPropagation();

    // Mettre à jour le récapitulatif après la suppression
    afficherRecapArticles();
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
    // Mettre à jour le total
    calculerTotal();
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

function supprimerToutPanier() {
    var panierListe = document.getElementById('panier-liste');
    panierListe.innerHTML = ''; // Supprimer tous les éléments de la liste

    // Réinitialiser le tableau panier
    panier = [];

    // Mettre à jour le nombre d'articles dans la bulle du panier
    nombreArticlesPanier = 0;
    mettreAJourNombreArticlesPanier();

    // Masquer la fenêtre flottante du panier
    masquerPanier();

    // Stockez le panier dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettre à jour le récapitulatif après la suppression de tout le panier
    afficherRecapArticles();
}

function afficherPrecommande() {
    var precommandeFenetre = document.getElementById('precommande-fenetre');
    var panierFenetre = document.getElementById('panier-fenetre');

    // Masquer la fenêtre du panier
    masquerPanier();

    // Afficher la fenêtre de précommande
    precommandeFenetre.style.display = 'flex';

    // Afficher le récapitulatif des articles
    afficherRecapArticles();
}

function fermerPrecommande() {
    var precommandeFenetre = document.getElementById('precommande-fenetre');

    // Masquer la fenêtre de précommande
    precommandeFenetre.style.display = 'none';
}

function afficherRecapArticles() {
    var recapArticlesDiv = document.getElementById('recap-articles');
    recapArticlesDiv.innerHTML = '';

    // Compter le nombre d'articles
    var counts = {};
    for (var i = 0; i < panier.length; i++) {
        var article = panier[i];
        counts[article] = counts[article] ? counts[article] + 1 : 1;
    }

    // Afficher le récapitulatif
    for (var article in counts) {
        var quantite = counts[article];
        var articleText = quantite > 1 ? `(${quantite}) x ${article}` : article;

        // Créer un paragraphe pour l'article
        var articleElement = document.createElement('p');
        articleElement.textContent = articleText;

        // Ajouter les champs de formulaire
        var labelFormat = document.createElement('label');
        var formatId = `choixFormat-${article}-${quantite}`;  // Utiliser un identifiant unique
        labelFormat.setAttribute('for', formatId);
        labelFormat.textContent = 'Format :';
        var selectFormat = document.createElement('select');
        selectFormat.setAttribute('id', formatId);
        selectFormat.setAttribute('name', formatId);
        var optionA5 = document.createElement('option');
        optionA5.setAttribute('value', 'A5');
        optionA5.textContent = 'A5';
        var optionA6 = document.createElement('option');
        optionA6.setAttribute('value', 'A6');
        optionA6.textContent = 'A6';
        selectFormat.appendChild(optionA5);
        selectFormat.appendChild(optionA6);

        var labelPlastifie = document.createElement('label');
        var plastifieId = `xd-${article}-${quantite}`;  // Utiliser un identifiant unique
        labelPlastifie.setAttribute('for', plastifieId);
        labelPlastifie.textContent = 'Plastifié :';
        var selectPlastifie = document.createElement('select');
        selectPlastifie.setAttribute('id', plastifieId);
        selectPlastifie.setAttribute('name', plastifieId);
        var optionNon = document.createElement('option');
        optionNon.setAttribute('value', 'Non');
        optionNon.textContent = 'Non';
        var optionOui = document.createElement('option');
        optionOui.setAttribute('value', 'Oui');
        optionOui.textContent = 'Oui';
        selectPlastifie.appendChild(optionNon);
        selectPlastifie.appendChild(optionOui);

        // Ajouter les éléments au paragraphe
        articleElement.appendChild(labelFormat);
        articleElement.appendChild(selectFormat);
        articleElement.appendChild(labelPlastifie);
        articleElement.appendChild(selectPlastifie);

        // Ajouter le paragraphe au div récapitulatif
        recapArticlesDiv.appendChild(articleElement);
    }
}

// Ajoutez cette fonction pour calculer le total des articles dans le panier
function calculerTotal() {
    var total = 0;
    for (var article in counts) {
        var quantite = counts[article];
        var prixArticle = obtenirPrixArticle(article);
        total += quantite * prixArticle;
    }
    var totalPanier = document.getElementById('panier-total');
    totalPanier.textContent = total + ' euros';
}

// Ajoutez cette fonction pour obtenir le prix d'un article
function obtenirPrixArticle(nomArticle) {
    var formatSelectId = `choixFormat-${nomArticle}`;
    var plastifieSelectId = `xd-${nomArticle}`;
    var formatSelect = document.getElementById(formatSelectId);
    var plastifieSelect = document.getElementById(plastifieSelectId);

    var format = formatSelect ? formatSelect.value : 'A6';
    var plastifie = plastifieSelect ? plastifieSelect.value : 'Non';

    // Utilisez les informations de format et plastifié pour obtenir le prix de l'article
    var prix = articlesPrix[nomArticle][format];

    // Si plastifié, ajoutez 10 euros
    if (plastifie === 'Oui') {
        prix += 10;
    }

    return prix;
}
