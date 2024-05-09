var panierAffiche = false;
var nombreArticlesPanier = 0;
var panier = [];

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

function fermerPanierSiClicExterieur(e) {
    var panierFenetre = document.getElementById('panier-fenetre');

    if (!panierFenetre.contains(e.target)) {
        panierAffiche = false;
        panierFenetre.style.display = 'none';
        document.removeEventListener('click', fermerPanierSiClicExterieur);
    }
}

function ajouterAuPanier(nomArticle, format = 'A5', plastifie = 'Non') {
    var panierListe = document.getElementById('panier-liste');
    var articleExistant = panier.find(article => article.nom === nomArticle && article.format === format && article.plastifie === plastifie);

    console.log("Avant ajout au panier - nom:", nomArticle, "format:", format, "plastifie:", plastifie);
    if (articleExistant) {
        // Si l'article existe déjà, augmenter la quantité
        articleExistant.quantite++;
        articleExistant.prix = obtenirPrixArticle(nomArticle, format, plastifie); // Mettre à jour le prix avec le paramètre plastification
        mettreAJourQuantiteArticle(articleExistant);
    } else {
        // Sinon, ajouter un nouvel article au panier avec le format et la plastification spécifiés
        var nouvelArticle = {
            nom: nomArticle,
            format: format,
            plastifie: plastifie, // Ajoutez cette ligne pour définir la propriété plastifie
            quantite: 1,
            prix: obtenirPrixArticle(nomArticle, format, plastifie)
        };

        console.log("Nouvel article ajouté au panier - nom:", nomArticle, "format:", format, "plastifie:", plastifie);

        panier.push(nouvelArticle);
        ajouterElementAuPanier(nouvelArticle);
    }

    console.log("Après ajout au panier - panier:", panier);

    // Mettre à jour le nombre d'articles dans la bulle du panier
    nombreArticlesPanier++;
    mettreAJourNombreArticlesPanier();
    document.getElementById('panier-bulle').textContent = nombreArticlesPanier;

    // Stocker le panier dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Appel pour mettre à jour le total
    document.getElementById("prixTotal").innerHTML = getPrixPanier();

    // Mettre à jour le récapitulatif après l'ajout
    afficherRecapArticles();
}

function ajouterElementAuPanier(article) {
    var panierListe = document.getElementById('panier-liste');
    var nouvelArticle = document.createElement('li');

    // Ajout du bouton de suppression avec un appel à la fonction supprimerArticle
    nouvelArticle.innerHTML = `
        [${article.quantite}] ${article.nom}
        <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>
        <span class="plastifie" data-value="${article.plastifie}"></span>
    `;

    panierListe.appendChild(nouvelArticle);
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
    var panierListe = document.getElementById('panier-liste');
    var elementASupprimer = boutonSupprimer.parentNode;

    if (elementASupprimer) {
        var nomArticle = elementASupprimer.firstChild.textContent.replace(/\[\d+\] /g, '').replace(/\[\d+\] x?/g, "").trim();
        if (nomArticle.startsWith('x')) {
            nomArticle = nomArticle.replace('x', '').trim();
        }
    

        // Stocker l'identifiant de l'article à supprimer   
        var idArticleASupprimer = null;
        var elementsArticlesPrecommande = document.getElementById('recap-articles').getElementsByTagName('p');
        for (var i = 0; i < elementsArticlesPrecommande.length; i++) {
            var articlePrecommande = elementsArticlesPrecommande[i];
            var idArticle = articlePrecommande.id.replace(/\[\d+\] /g, '').replace(/\[\d+\] x?/g, "").trim();
            if (idArticle.startsWith('x')) {
                idArticle = idArticle.replace('x', '').trim();
            }
            console.log(idArticle)
            if (idArticle === nomArticle) {
                idArticleASupprimer = articlePrecommande.id;
                break; // Pas besoin de continuer à boucler une fois que l'ID est trouvé
            }
        }



        if (idArticleASupprimer) {
            // Supprimer l'article correspondant du panier
            panierListe.removeChild(elementASupprimer);
            var index = panier.findIndex(article => article.nom === nomArticle);
            if (index !== -1) {
                panier.splice(index, 1);
            }

            // Supprimer le paragraphe correspondant de la div recap-articles
            var articleASupprimer = document.getElementById(idArticleASupprimer);
            if (articleASupprimer) {
                articleASupprimer.parentNode.removeChild(articleASupprimer);
            }

            // Mettre à jour le nombre d'articles dans la bulle du panier
            nombreArticlesPanier--;
            mettreAJourNombreArticlesPanier();

            // Stocker le panier dans localStorage
            localStorage.setItem('panier', JSON.stringify(panier));

            // Mettre à jour le total
            document.getElementById("prixTotal").innerHTML = getPrixPanier();
        }
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
    panierFenetre.style.display = 'flex';
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
    bullePanier.style.display = nombreArticlesPanier > 0 ? 'flex' : 'none';
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

    // Mettre à jour le total
    document.getElementById("prixTotal").innerHTML = '0 €'; // Réinitialiser le prix total à zéro

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

    // Réinitialiser le récapitulatif des articles
    afficherRecapArticles();

}


