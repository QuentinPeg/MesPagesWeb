function fermerPrecommande() {
    var precommandeFenetre = document.getElementById('precommande-fenetre');

    // Masquer la fenêtre de précommande
    precommandeFenetre.style.display = 'none';
}

function afficherRecapArticles() {
    var recapArticlesDiv = document.getElementById('recap-articles');
    recapArticlesDiv.textContent = '';

    // Récupérer le panier du localStorage
    var panierSauvegarde = JSON.parse(localStorage.getItem('panier'));
    if (panierSauvegarde) {
        panier = panierSauvegarde; // Remplace le panier actuel par le panier sauvegardé
    }

    panier.forEach((article) => {
        var quantite = article.quantite;
        var nom = article.nom;
        var format = article.format;
        var plastifie = article.plastifie;
        var sousTotal = calculerSousTotal(article);

        // Créer l'affichage pour l'article
        var articleText = document.createElement('span');
        articleText.textContent = quantite > 1 ? `[${quantite}] x ${nom}` : nom;

        // Afficher le sous-total
        var sousTotalText = document.createElement('span');
        sousTotalText.textContent = ` : ${sousTotal.toFixed(2)} €`;

        // Créer les boutons d'augmentation et de diminution
        var btnDecrease = document.createElement('button');
        btnDecrease.textContent = '-';
        btnDecrease.className = 'btn-quantite';
        btnDecrease.type = 'button';

        var btnIncrease = document.createElement('button');
        btnIncrease.textContent = '+';
        btnIncrease.className = 'btn-quantite';
        btnIncrease.type = 'button';

        // Créer l'élément pour la quantité
        var quantitediv = document.createElement('span');
        quantitediv.style.display = 'flex'; // Permet d'aligner les éléments en ligne
        quantitediv.style.alignItems = 'center'; // Centrer verticalement les éléments
        quantitediv.style.gap = '10px'; // Ajoute un espace de 5 pixels entre les éléments

        var quantiteElement = document.createElement('span');
        quantiteElement.textContent = `[${quantite}]`;
        quantiteElement.setAttribute('data-quantity', quantite);

        // Créer l'élément d'article
        var articleElement = document.createElement('p');
        articleElement.id = `${nom}-${format}-${plastifie}`;
        quantitediv.appendChild(btnDecrease);
        quantitediv.appendChild(quantiteElement);
        quantitediv.appendChild(btnIncrease);
        articleElement.appendChild(quantitediv);
        articleElement.appendChild(document.createTextNode(` x ${nom}`));

        // Ajouter des écouteurs d'événements aux boutons
        btnDecrease.addEventListener('click', function () {
            var currentQuantity = parseInt(quantiteElement.getAttribute('data-quantity'), 10);
            if (currentQuantity > 0) {
                quantiteElement.setAttribute('data-quantity', currentQuantity - 1);
                quantiteElement.textContent = `[${currentQuantity - 1}]`;
                updateCart('decrement', nom, format, plastifie);

                // Recalculer et mettre à jour le sous-total
                let sousTotal = calculerSousTotal(panier.find(article =>
                    article.nom === nom && article.format === format && article.plastifie === plastifie
                ));
                sousTotalText.textContent = ` : ${sousTotal.toFixed(2)} €`;

                calculerTotal(); // Recalculer le total après mise à jour

                // Si la quantité devient 0, supprimer l'article de l'affichage
                if (currentQuantity - 1 === 0) {
                    articleElement.remove(); // Retire l'élément visuel
                }
            }
        });

        btnIncrease.addEventListener('click', function () {
            var totalQuantite = panier.reduce((acc, article) => acc + article.quantite, 0);

            if (totalQuantite >= 10) {
                alert('Vous ne pouvez pas avoir plus de 10 articles au total dans votre panier.');
                return;
            }

            var currentQuantity = parseInt(quantiteElement.getAttribute('data-quantity'), 10);
            quantiteElement.setAttribute('data-quantity', currentQuantity + 1);
            quantiteElement.textContent = `[${currentQuantity + 1}]`;
            updateCart('increment', nom, format, plastifie);

            // Recalculer et mettre à jour le sous-total
            let sousTotal = calculerSousTotal(panier.find(article =>
                article.nom === nom && article.format === format && article.plastifie === plastifie
            ));
            sousTotalText.textContent = ` : ${sousTotal.toFixed(2)} €`;

            calculerTotal(); // Recalculer le total après mise à jour
        });
        // Créer les éléments de format et plastification
        var labelFormat = document.createElement('label');
        labelFormat.textContent = 'Format :';
        var selectFormat = createFormatSelect(nom, quantite, `${nom}-${format}-Format`, format);

        var labelPlastifie = document.createElement('label');
        labelPlastifie.textContent = 'Plastifié :';
        var selectPlastifie = createPlastifieSelect(nom, quantite, `${nom}-${format}-Plastifie`, plastifie);

        selectFormat.setAttribute('data-format', format);
        selectPlastifie.setAttribute('data-plastifie', plastifie);

        // Ajouter les éléments au DOM
        articleElement.appendChild(labelFormat);
        articleElement.appendChild(selectFormat);
        articleElement.appendChild(labelPlastifie);
        articleElement.appendChild(selectPlastifie);
        articleElement.appendChild(sousTotalText);

        recapArticlesDiv.appendChild(articleElement);
    });
}

function updateCart(action, nom, format, plastifie) {
    // Trouver l'article dans le panier correspondant aux attributs nom, format, et plastifie
    var articleIndex = panier.findIndex(article =>
        article.nom === nom &&
        article.format === format &&
        article.plastifie === plastifie
    );

    if (articleIndex !== -1) {
        // Ajuster la quantité en fonction de l'action
        if (action === 'increment') {
            panier[articleIndex].quantite += 1;
        } else if (action === 'decrement') {
            panier[articleIndex].quantite -= 1;

            // Si la quantité atteint 0, supprimer l'article du panier
            if (panier[articleIndex].quantite === 0) {
                panier.splice(articleIndex, 1);
                mettreAJourNombreArticlesPanier();
            }
        }

        // Mettre à jour le localStorage avec le nouveau panier
        localStorage.setItem('panier', JSON.stringify(panier));
    }

    // Recompte les articles
    mettreAJourNombreArticlesPanier();
    rechargerPanierDepuisLocalStorage()
    // Recalculer le total après mise à jour
    calculerTotal();
}

function calculerSousTotal(article) {
    // Vérifier si l'article a un prix défini dans articlesPrix
    if (articlesPrix[article.nom] && articlesPrix[article.nom][article.format]) {
        // Récupérer le prix de base depuis articlesPrix
        const prixUnitaire = articlesPrix[article.nom][article.format];
        // Calculer le sous-total pour cet article
        let sousTotal = prixUnitaire * article.quantite;

        // Ajouter 10% si l'article est plastifié
        if (article.plastifie === "Oui") {
            sousTotal *= 1.10;
        }

        // Retourner le sous-total calculé
        return sousTotal;
    } else {
        console.error(`Prix non trouvé pour l'article ${article.nom} avec le format ${article.format}`);
        return 0; // Retourner 0 si le prix n'est pas trouvé
    }
}


function createFormatSelect(nom, quantite, key, selectedFormat) {
    var selectFormat = document.createElement('select');
    selectFormat.setAttribute('data-nom', nom);
    selectFormat.setAttribute('data-quantite', quantite);
    selectFormat.setAttribute('data-key', key);

    var optionA5 = createOption('A5', 'A5', selectedFormat);
    var optionA6 = createOption('A6', 'A6', selectedFormat);

    selectFormat.appendChild(optionA5);
    selectFormat.appendChild(optionA6);
    selectFormat.value = selectedFormat;

    selectFormat.addEventListener('change', function (event) {
        var selectedFormat = event.target.value;

        // Correction : Utiliser une comparaison correcte pour trouver l'article
        var articleIndex = panier.findIndex(a => a.nom === nom && a.quantite === quantite);
        if (articleIndex !== -1) {
            panier[articleIndex].format = selectedFormat;
        }

        // Mettre à jour l'attribut data-format avec le nouveau format sélectionné
        event.target.setAttribute('data-format', selectedFormat);

        // Mettre à jour localStorage avec les nouvelles informations
        localStorage.setItem('panier', JSON.stringify(panier));
        // Recalculer le sous-total et le mettre à jour
        let sousTotal = calculerSousTotal(panier[articleIndex]);
        const sousTotalText = event.target.closest('p').querySelector('span:last-child');
        sousTotalText.textContent = ` : ${sousTotal.toFixed(2)} €`;

        // Recalculer le total après modification
        calculerTotal();
    });

    return selectFormat;
}

function createPlastifieSelect(nom, quantite, key, selectedPlastifie) {
    var selectPlastifie = document.createElement('select');
    selectPlastifie.setAttribute('data-nom', nom);
    selectPlastifie.setAttribute('data-quantite', quantite);
    selectPlastifie.setAttribute('data-key', key);

    var optionNon = createOption('Non', 'Non', selectedPlastifie);
    var optionOui = createOption('Oui', 'Oui', selectedPlastifie);

    selectPlastifie.appendChild(optionNon);
    selectPlastifie.appendChild(optionOui);

    selectPlastifie.value = selectedPlastifie;

    selectPlastifie.addEventListener('change', function (event) {
        var selectedPlastifie = event.target.value;

        // Recherche de l'article dans le panier par nom et format
        var articleIndex = panier.findIndex(a => a.nom === nom && a.quantite === quantite);
        if (articleIndex !== -1) {
            panier[articleIndex].plastifie = selectPlastifie;
        }


        if (articleIndex !== -1) {
            // Mettre à jour la plastification de l'article dans le panier
            panier[articleIndex].plastifie = selectedPlastifie;

        }

        // Forcer la mise à jour du localStorage
        localStorage.setItem('panier', JSON.stringify(panier));
        // Recalculer le sous-total et le mettre à jour
        let sousTotal = calculerSousTotal(panier[articleIndex]);
        const sousTotalText = event.target.closest('p').querySelector('span:last-child');
        sousTotalText.textContent = ` : ${sousTotal.toFixed(2)} €`;

        // Recalculer le total après modification
        calculerTotal();
    });

    return selectPlastifie;
}

function createOption(value, text, selectedValue) {
    var option = document.createElement('option');
    option.setAttribute('value', value);
    option.textContent = text;
    if (value === selectedValue) {
        option.selected = true;
    }
    return option;
}

function calculerTotal() {
    var total = 0;

    // Parcourir chaque article dans le panier
    panier.forEach(article => {
        // Vérifier si le nom et le format de l'article existent dans la variable articlesPrix
        if (articlesPrix[article.nom] && articlesPrix[article.nom][article.format]) {
            // Récupérer le prix de base depuis articlesPrix
            var prixUnitaire = articlesPrix[article.nom][article.format];

            // Calculer le sous-total pour cet article
            var sousTotal = prixUnitaire * article.quantite;

            // Ajouter 10% si l'article est plastifié
            if (article.plastifie === "Oui") {
                sousTotal *= 1.10;
            }

            // Ajouter le sous-total au total général
            total += sousTotal;
        } else {
            console.error(`Prix non trouvé pour l'article ${article.nom} avec le format ${article.format}`);
        }
    });

    // Mettre à jour l'affichage du total dans les éléments HTML correspondants
    document.getElementById('amount').value = total.toFixed(2);
    document.getElementById("prixTotal").textContent = formaterPrix(total);
}

// Fonction pour formater le prix avec une virgule si nécessaire
function formaterPrix(prix) {
    var prixFormate = prix % 1 !== 0 ? prix.toFixed(2).replace('.', ',') : prix.toFixed(0);
    return prixFormate + ' €';
}

// Définir les prix des articles
var articlesPrix = {
    'Pack intégral': {
        'A6': 250,
        'A5': 290,
    },
    'Pack Première Année': {
        'A6': 86,
        'A5': 117
    },
    'Pack Deuxième Année': {
        'A6': 99,
        'A5': 130
    },
    'Pack Troisième Année': {
        'A6': 69,
        'A5': 96
    },
    'Pack Semestre 1': {
        'A6': 69,
        'A5': 92
    },
    'Pack Semestre 3': {
        'A6': 71,
        'A5': 86
    },
    'Soins Infirmier': {
        'A6': 35,
        'A5': 43
    },
    'Cycle de la vie et grande fonction (UE 2.2 semestre 1)': {
        'A6': 30,
        'A5': 38
    },
    'Biologie fondamentale (UE 2.1 semestre 1)': {
        'A6': 20,
        'A5': 28
    },
    'Processus traumatique (UE 2.4 semestre 1)': {
        'A6': 23,
        'A5': 31
    },
    'Processus psychopathologique (UE 2.6 semestre 2)': {
        'A6': 30,
        'A5': 38,
    },
    'Processus psychopathologique (UE 2.6 semestre 5)': {
        'A6': 18,
        'A5': 26
    },
    'Processus obstructif (UE 2.8 semestre 3)': {
        'A6': 17,
        'A5': 25
    },
    'Processus infectieux (UE 2.5 semestre 3)': {
        'A6': 38,
        'A5': 46
    },
    'Processus dégénératif (UE 2.7 semestre 4)': {
        'A6': 30,
        'A5': 38
    },
    'Processus tumoraux (UE 2.9 semestre 5)': {
        'A6': 35,
        'A5': 43
    },
};


function obtenirPrixArticle(nomArticle, format) {
    var prix = 0;

    switch (nomArticle) {
        case 'Pack intégral':
            prix = articlesPrix['Pack intégral'][format];
            break;
        case 'Pack Première Année':
            prix = articlesPrix['Pack Première Année'][format];
            break;
        case 'Pack Deuxième Année':
            prix = articlesPrix['Pack Deuxième Année'][format];
            break;
        case 'Pack Troisième Année':
            prix = articlesPrix['Pack Troisième Année'][format];
            break;
        case 'Pack Semestre 1':
            prix = articlesPrix['Pack Semestre 1'][format];
            break;
        case 'Pack Semestre 3':
            prix = articlesPrix['Pack Semestre 3'][format];
            break;
        case 'Soins Infirmier':
            prix = articlesPrix['Soins Infirmier'][format];
            break;
        case 'Cycle de la vie et grande fonction (UE 2.2 semestre 1)':
            prix = articlesPrix['Cycle de la vie et grande fonction (UE 2.2 semestre 1)'][format];
            break;
        case 'Biologie fondamentale (UE 2.1 semestre 1)':
            prix = articlesPrix['Biologie fondamentale (UE 2.1 semestre 1)'][format];
            break;
        case 'Processus traumatique (UE 2.4 semestre 1)':
            prix = articlesPrix['Processus traumatique (UE 2.4 semestre 1)'][format];
            break;
        case 'Processus psychopathologique (UE 2.6 semestre 2)':
            prix = articlesPrix['Processus psychopathologique (UE 2.6 semestre 2)'][format];
            break;
        case 'Processus psychopathologique (UE 2.6 semestre 5)':
            prix = articlesPrix['Processus psychopathologique (UE 2.6 semestre 5)'][format];
            break;
        case 'Processus obstructif (UE 2.8 semestre 3)':
            prix = articlesPrix['Processus obstructif (UE 2.8 semestre 3)'][format];
            break;
        case 'Processus infectieux (UE 2.5 semestre 3)':
            prix = articlesPrix['Processus infectieux (UE 2.5 semestre 3)'][format];
            break;
        case 'Processus dégénératif (UE 2.7 semestre 4)':
            prix = articlesPrix['Processus dégénératif (UE 2.7 semestre 4)'][format];
            break;
        case 'Processus tumoraux (UE 2.9 semestre 5)':
            prix = articlesPrix['Processus tumoraux (UE 2.9 semestre 5)'][format];
            break;
        default:
            // Si l'article n'est pas reconnu, le prix reste à 0
            break;
    }

    return prix

}

// Fonction pour obtenir le prix total du panier
function getPrixPanier() {
    var total = 0;

    for (var i = 0; i < panier.length; i++) {
        var article = panier[i];
        var prixUnitaire = obtenirPrixArticle(article.nom, article.format, article.plastifie);
        total += prixUnitaire * article.quantite;
    }

    return total + ' €';
}
