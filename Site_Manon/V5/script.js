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

function supprimerToutPanier() {
    var panierListe = document.getElementById('panier-liste');
    panierListe.innerHTML = ''; // Supprimer tous les éléments de la liste

    // Mettre à jour le nombre d'articles dans la bulle du panier
    nombreArticlesPanier = 0;
    mettreAJourNombreArticlesPanier();

    // Masquer la fenêtre flottante du panier
    masquerPanier();
}


