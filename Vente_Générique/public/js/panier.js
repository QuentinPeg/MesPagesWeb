var panierAffiche = false;
var nombreArticlesPanier = 0;
var panier = [];
window.onload = function () {
    rechargerPanierDepuisLocalStorage();
};

function togglePanier(e) {
    e.stopPropagation();

    var panierFenetre = document.getElementById('panier-fenetre');
    var precommandeFenetre = document.getElementById('precommande-fenetre');
    panierAffiche = !panierAffiche;

    if (panierAffiche) {
        panierFenetre.style.display = 'flex';
        precommandeFenetre.style.display = 'none'; // Masquer la précommande lors de l'ouverture du panier
    } else {
        panierFenetre.style.display = 'none';
    }
}

function rechargerPanierDepuisLocalStorage() {
    var panierListe = document.getElementById('panier-liste');
    panierListe.innerHTML = ''; // Effacer l'affichage actuel du panier

    // Charger le panier à partir du localStorage
    var panierStocke = JSON.parse(localStorage.getItem('panier')) || [];
    panier = panierStocke; // Mettre à jour la variable panier

    // Ajouter chaque article du panier au DOM
    panier.forEach(article => ajouterElementAuPanier(article));

    // Mettre à jour le nombre total d'articles dans la bulle du panier
    mettreAJourNombreArticlesPanier();

    // Mettre à jour le prix total affiché
    document.getElementById("prixTotal").innerHTML = getPrixPanier();
    afficherRecapArticles();
    mettreAJourMontant();

}


function fermerPanierSiClicExterieur(e) {
    var panierFenetre = document.getElementById('panier-fenetre');

    if (!panierFenetre.contains(e.target)) {
        panierAffiche = false;
        panierFenetre.style.display = 'none';
        document.removeEventListener('click', fermerPanierSiClicExterieur);
    }
}

function ajouterAuPanier(nomArticle, format = 'A5', plastifie = 'Non') {
    var articleExistant = panier.find(article => article.nom === nomArticle && article.format === format && article.plastifie === plastifie);

    if (articleExistant) {
        // Si l'article existe déjà, augmenter la quantité
        articleExistant.quantite++;
        articleExistant.prix = obtenirPrixArticle(nomArticle, format, plastifie);
    } else {
        // Sinon, ajouter un nouvel article au panier avec les spécifications fournies
        var nouvelArticle = {
            nom: nomArticle,
            format: format,
            plastifie: plastifie,
            quantite: 1,
            prix: obtenirPrixArticle(nomArticle, format, plastifie)
        };
        panier.push(nouvelArticle);
    }

    // Mettre à jour le localStorage avec le panier
    localStorage.setItem('panier', JSON.stringify(panier));

    // Recharger l'affichage du panier pour refléter les nouvelles données
    rechargerPanierDepuisLocalStorage();
}

function ajouterElementAuPanier(article) {
    var panierListe = document.getElementById('panier-liste');
    var nouvelArticle = document.createElement('li');

    nouvelArticle.innerHTML = `
        <span class="nom-article">${article.nom}</span> :                <button class="btn-quantite" onclick="reduireQuantite(event, this)">-</button>
        <span class="quantite-article">${article.quantite}</span>
        <button class="btn-quantite" onclick="ajouterQuantite(event, this)">+</button>

        <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>
        <span class="plastifie" data-value="${article.plastifie}"></span>
    `;

    panierListe.appendChild(nouvelArticle);
}

function ajouterQuantite(event, bouton) {
    // Trouver l'article dont la quantité doit être augmentée
    var liArticle = bouton.closest('li');  // Trouver l'élément li de l'article
    var nomArticle = liArticle.querySelector('.nom-article').textContent.trim(); // Récupérer le nom de l'article
    var article = panier.find(a => a.nom === nomArticle); // Chercher l'article dans le panier

    if (article) {
        article.quantite++; // Incrémenter la quantité
        article.prix = obtenirPrixArticle(article.nom, article.format, article.plastifie); // Recalculer le prix si nécessaire

        // Mettre à jour le localStorage
        localStorage.setItem('panier', JSON.stringify(panier));

        // Recharger l'affichage du panier
        rechargerPanierDepuisLocalStorage();
    }

    event.stopPropagation(); // Empêcher la propagation de l'événement
}


function reduireQuantite(event, bouton) {
    // Trouver l'article dont la quantité doit être diminuée
    var liArticle = bouton.closest('li');  // Trouver l'élément li de l'article
    var nomArticle = liArticle.querySelector('.nom-article').textContent.trim(); // Récupérer le nom de l'article
    var article = panier.find(a => a.nom === nomArticle); // Chercher l'article dans le panier

    if (article && article.quantite > 1) {
        article.quantite--; // Réduire la quantité
        article.prix = obtenirPrixArticle(article.nom, article.format, article.plastifie); // Recalculer le prix si nécessaire

        // Mettre à jour le localStorage
        localStorage.setItem('panier', JSON.stringify(panier));

        // Recharger l'affichage du panier
        rechargerPanierDepuisLocalStorage();
    }

    event.stopPropagation(); // Empêcher la propagation de l'événement
}


function mettreAJourQuantiteArticle(article) {
    var panierListe = document.getElementById('panier-liste');
    var elementsArticles = panierListe.getElementsByTagName('li');

    for (var i = 0; i < elementsArticles.length; i++) {
        var elementArticle = elementsArticles[i];

        if (elementArticle.textContent.includes(article.nom)) {
            // Mettre à jour la quantité de l'article dans le panier
            elementArticle.innerHTML = `[${article.quantite}] x${article.nom}
                <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>`;
            break;  // Sortir de la boucle une fois que l'article est mis à jour
        }
    }
}

function supprimerArticle(event, boutonSupprimer) {
    var nomArticle = boutonSupprimer.parentNode.textContent.replace(/ \[\d+\] |✖/g, '').trim().split(':')[0].trim();
    
    // Supprimer l'article du panier
    panier = panier.filter(article => article.nom !== nomArticle);
    
    // Mettre à jour le localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Recharger l'affichage du panier
    rechargerPanierDepuisLocalStorage();

    // Empêcher la propagation du clic
    event.stopPropagation();
}

function supprimerToutPanier() {
    panier = []; // Vider le tableau panier

    // Mettre à jour le localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Recharger l'affichage du panier
    rechargerPanierDepuisLocalStorage();
}


function masquerPanier() {
    var panierFenetre = document.getElementById('panier-fenetre');
    panierFenetre.style.display = 'none';
    document.removeEventListener('click', fermerPanierSiClicExterieur);
}

function afficherPanier() {
    var panierFenetre = document.getElementById('panier-fenetre');
    panierFenetre.style.display = 'flex';
    document.addEventListener('click', fermerPanierSiClicExterieur);
    // Mettre à jour le total
    calculerTotal();
}

function mettreAJourNombreArticlesPanier() {
    var bullePanier = document.getElementById('panier-bulle');

    // Récupérer le panier du localStorage et le parser
    var panier = JSON.parse(localStorage.getItem('panier')) || [];

    // Calculer le nombre total d'articles dans le panier en sommant les quantités
    var nombreArticlesPanier = panier.reduce((total, article) => total + article.quantite, 0);

    // Mettre à jour le contenu de la bulle avec le nombre d'articles
    bullePanier.textContent = nombreArticlesPanier;

    // Afficher ou masquer la bulle en fonction du nombre d'articles
    bullePanier.style.display = nombreArticlesPanier > 0 ? 'flex' : 'none';
}

document.querySelector('.panier-link').addEventListener('click', togglePanier);

// Charger le panier depuis localStorage
window.onload = function () {
    var panierStocke = localStorage.getItem('panier');
    if (panierStocke) {
        panier = JSON.parse(panierStocke);
        nombreArticlesPanier = panier.reduce((total, article) => total + article.quantite, 0);
        mettreAJourNombreArticlesPanier();
        panier.forEach(article => ajouterElementAuPanier(article));
        document.getElementById("prixTotal").innerHTML = getPrixPanier();
    }
    mettreAJourMontant();
};

function afficherPrecommande() {

    // Valider l'ouverture de la précommande
    if (!validerOuverturePreco()) {
        return; // Si la validation échoue, ne pas continuer
    }

    var precommandeFenetre = document.getElementById('precommande-fenetre');
    var panierFenetre = document.getElementById('panier-fenetre');

    // Masquer la fenêtre du panier
    masquerPanier();

    // Afficher la fenêtre de précommande
    precommandeFenetre.style.display = 'flex';

    // Réinitialiser le récapitulatif des articles
    afficherRecapArticles();

}

function validerOuverturePreco() {
    // Récupérer le panier du localStorage
    var panier = JSON.parse(localStorage.getItem('panier')) || [];

    // Calculer la somme des quantités des articles dans le panier
    var totalQuantite = panier.reduce((total, article) => total + article.quantite, 0);

    // Vérifier s'il y a des éléments dans le panier
    if (panier.length === 0) {
        alert('Votre panier est vide. Veuillez ajouter des articles.');
        return false;
    }

    // Vérifier si la somme des quantités dépasse 10
    if (totalQuantite > 10) {
        alert('Vous ne pouvez pas avoir plus de 10 articles dans votre panier.');
        return false;
    }

    return true; // Si tout est valide, retourner true
}
function mettreAJourMontant() {
    // Calculer le montant total du panier
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const montantTotal = panier.reduce((total, article) => total + (article.prix * article.quantite), 0);

    // Mettre à jour la valeur de l'input hidden "amount"
    const inputAmount = document.getElementById('amount');
    if (inputAmount) {
        inputAmount.value = montantTotal.toFixed(2); // Arrondir à 2 décimales
    }

    // Afficher le montant total dans le résumé du panier (optionnel)
    document.getElementById("prixTotal").innerHTML = montantTotal.toFixed(2) + " €";
}
function envoyerMail() {
    // Initialiser EmailJS
    (function () {
        emailjs.init("ixOrs32Cy-jH_Xqoi");
    })();

    // Récupérer `mailData` depuis le localStorage
    const mailData = JSON.parse(localStorage.getItem('mailData'));
    
    // Vérifier si `mailData` existe
    if (!mailData) {
        alert("Aucune donnée à envoyer. Veuillez vérifier votre panier.");
        return;
    }

    // Préparer les paramètres pour EmailJS
    let sendername = mailData.sendername || "Client";
    let replyto = mailData.replyto || "no-reply@example.com";
    let message = mailData.message || "Message non disponible";

    // Paramètres pour EmailJS
    let parms = {
        sendername: sendername,
        replyto: replyto,
        message: message
    };

    // Identifiants de service et template EmailJS
    let serviceID = "service_b1jfzdk";
    let templateID = "template_qcjv2ql";

    // Envoi de l'email via EmailJS
    emailjs.send(serviceID, templateID, parms)
        .then((response) => {
            alert("Précommande envoyée !\nNous vous contacterons sous 3 jours.\n(Envoi de la commande en moins d'une semaine)");

            // Vider le localStorage après un envoi réussi
            localStorage.clear();
        })
        .catch((error) => {
            alert("Une erreur est survenue lors de l'envoi de la précommande.\nVeuillez nous contacter pour confirmer la commande.\nErreur :", error);
        });
}
