function fermerPrecommande() {
    var precommandeFenetre = document.getElementById('precommande-fenetre');

    // Masquer la fenêtre de précommande
    precommandeFenetre.style.display = 'none';
}

function afficherRecapArticles() {
    var recapArticlesDiv = document.getElementById('recap-articles');
    recapArticlesDiv.textContent = '';

    for (var i = 0; i < panier.length; i++) {
        var article = panier[i];
        var quantite = article.quantite;
        var nom = article.nom;
        var keyFormat = `${nom}-${article.format}-Format`; // Clé pour l'option Format
        var keyPlastifie = `${nom}-${article.format}-Plastifie`; // Clé pour l'option Plastifié

        var articleText = quantite > 1 ? `[${quantite}] x ${nom}` : nom;

        var articleElement = document.createElement('p');
        articleElement.textContent = articleText;

        var labelFormat = document.createElement('label');
        labelFormat.textContent = 'Format :';
        var selectFormat = createFormatSelect(nom, quantite, keyFormat, article.format); // Utiliser keyFormat

        var labelPlastifie = document.createElement('label');
        labelPlastifie.textContent = 'Plastifié :';
        var selectPlastifie = createPlastifieSelect(nom, quantite, keyPlastifie, article.plastifie); // Utiliser keyPlastifie

        articleElement.appendChild(labelFormat);
        articleElement.appendChild(selectFormat);
        articleElement.appendChild(labelPlastifie);
        articleElement.appendChild(selectPlastifie);

        recapArticlesDiv.appendChild(articleElement);
    }
}


// Ajout d'une fonction pour créer les options Plastifie avec la bonne sélection
// Fonction pour créer les options Plastifie avec la bonne sélection
function createPlastifieSelect(nom, quantite, key, selectedPlastifie) {
    var selectPlastifie = document.createElement('select');
    selectPlastifie.setAttribute('data-nom', nom);
    selectPlastifie.setAttribute('data-quantite', quantite);
    selectPlastifie.setAttribute('data-key', key); // Utiliser la clé fournie comme attribut data-key

    var optionNon = createOption('Non', 'Non', selectedPlastifie);
    var optionOui = createOption('Oui', 'Oui', selectedPlastifie);

    selectPlastifie.appendChild(optionNon);
    selectPlastifie.appendChild(optionOui);

    // Sélectionnez la bonne option en fonction de la plastification actuelle de l'article
    selectPlastifie.value = selectedPlastifie;

    selectPlastifie.addEventListener('change', function (event) {
        var selectedPlastifie = event.target.value;
        var key = event.target.getAttribute('data-key');
        var articleIndex = panier.findIndex(a => `${a.nom}-${a.format}-Plastifie` === key); // Vérifier la clé Plastifié
        if (articleIndex !== -1) {
            panier[articleIndex].plastifie = selectedPlastifie;
            // Si l'utilisateur sélectionne "Non", mettez à jour automatiquement la sélection Format à "A5"
            if (selectedPlastifie === 'Non') {
                var selectFormat = document.querySelector(`select[data-nom="${nom}"][data-quantite="${quantite}"][data-key="${key.replace('-Plastifie', '-Format')}"]`); // Utiliser la clé Format
                if (selectFormat) {
                    selectFormat.value = 'A5';
                    panier[articleIndex].format = 'A5';
                }
            }
        }
        calculerTotal();
    });

    return selectPlastifie;
}

function createFormatSelect(nom, quantite, key, selectedFormat) {
    var selectFormat = document.createElement('select');
    selectFormat.setAttribute('data-nom', nom);
    selectFormat.setAttribute('data-quantite', quantite);
    selectFormat.setAttribute('data-key', key); // Utiliser la clé fournie comme attribut data-key

    var optionA5 = createOption('A5', 'A5', selectedFormat);
    var optionA6 = createOption('A6', 'A6', selectedFormat);

    selectFormat.appendChild(optionA5);
    selectFormat.appendChild(optionA6);
    selectFormat.value = selectedFormat;

    selectFormat.addEventListener('change', function (event) {
        var selectedFormat = event.target.value;
        var key = event.target.getAttribute('data-key');
        var articleIndex = panier.findIndex(a => `${a.nom}-${a.plastifie}-Format` === key); // Vérifier la clé Format
        if (articleIndex !== -1) {
            panier[articleIndex].format = selectedFormat;
        }
        calculerTotal();
    });

    return selectFormat;
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

// Définir les prix des articles
var articlesPrix = {
    'Pack intégral': {
        'A6': 250,
        'A5': 290,
        'A6P': 250 * 1.10
    },
    'Pack première année': {
        'A6': 86,
        'A5': 117
    },
    'Pack deuxième année': {
        'A6': 99,
        'A5': 130
    },
    'Pack troisième année': {
        'A6': 69,
        'A5': 96
    },
    'Pack semestre 1': {
        'A6': 69,
        'A5': 92
    },
    'Pack semestre 3': {
        'A6': 71,
        'A5': 86
    },
    'Soins Infirmier': {
        'A6': 35,
        'A5': 43
    },
    'Cycle de la vie et grande fonction (UE 2.2 S1)': {
        'A6': 30,
        'A5': 38
    },
    'Biologie fondamentale (UE 2.1 S1)': {
        'A6': 20,
        'A5': 28
    },
    'Processus traumatique (UE 2.4 S1)': {
        'A6': 23,
        'A5': 31
    },
    'Processus psychopathologique (UE 2.6 S2)': {
        'A6': 30,
        'A5': 38,
    },
    'Processus psychopathologique (UE 2.6 S5)': {
        'A6': 18,
        'A5': 26
    },
    'Processus obstructif (UE 2.8 S3)': {
        'A6': 17,
        'A5': 25
    },
    'Processus infectieux (UE 2.5 S3)': {
        'A6': 38,
        'A5': 46
    },
    'Processus dégénératif (UE 2.7 S4)': {
        'A6': 30,
        'A5': 38
    },
    'Les processus tumoraux (UE 2.9 S5)': {
        'A6': 35,
        'A5': 43
    },
};

function calculerTotal() {
    var total = 0;

    for (var i = 0; i < panier.length; i++) {
        var article = panier[i];

        // Utilisez le format et la plastification de la fenêtre flottante de la précommande s'ils existent
        var formatSelect = document.querySelector(`select[data-nom="${article.nom}"][data-quantite="${article.quantite}"][data-key="${article.nom}-${article.format}-Format"]`);
        var plastifieSelect = document.querySelector(`select[data-nom="${article.nom}"][data-quantite="${article.quantite}"][data-key="${article.nom}-${article.format}-Plastifie"]`);
        console.log(article.format);
        console.log(article.plastifie);

        console.log(formatSelect)
        console.log(plastifieSelect)

        // Assurez-vous que les sélecteurs existent avant de récupérer les valeurs
        var format = formatSelect ? formatSelect.value : article.format;
        var plastifie = plastifieSelect ? plastifieSelect.value : article.plastifie;

        // Condition de plastification
        var prixUnitaire = obtenirPrixArticle(article.nom, format, plastifie);
        var prixUnitairePlastifie = obtenirPrixArticle(article.nom, format, 'Oui');
        console.log(plastifie)
        if (plastifie === 'Oui') {
            console.log('Condition de plastification atteinte');
            // Augmentez le prix de 10% par rapport au prix plastifié
            prixUnitaire += prixUnitaire * 0.10;
            article.plastifie = 'Non';
        } else if (plastifie === 'Non') {
            // Appliquer une réduction de 10% si l'article était initialement plastifié
            prixUnitaire = prixUnitairePlastifie;
        }

        total += prixUnitaire * article.quantite;
    }

    // Mettre à jour le total dans l'élément HTML correspondant en utilisant la fonction de formatage
    document.getElementById("prixTotal").textContent = formaterPrix(total);
}



// Fonction pour formater le prix avec une virgule si nécessaire
function formaterPrix(prix) {
    var prixFormate = prix % 1 !== 0 ? prix.toFixed(2).replace('.', ',') : prix.toFixed(0);
    return prixFormate + ' €';
}

function obtenirPrixArticle(nomArticle, format, plastifie) {
    var prix = 0;

    switch (nomArticle) {
        case 'Pack intégral':
            prix = articlesPrix['Pack intégral'][format];
            break;
        case 'Pack première année':
            prix = articlesPrix['Pack première année'][format];
            break;
        case 'Pack deuxième année':
            prix = articlesPrix['Pack deuxième année'][format];
            break;
        case 'Pack troisième année':
            prix = articlesPrix['Pack troisième année'][format];
            break;
        case 'Pack semestre 1':
            prix = articlesPrix['Pack semestre 1'][format];
            break;
        case 'Pack semestre 3':
            prix = articlesPrix['Pack semestre 3'][format];
            break;
        case 'Soins Infirmier':
            prix = articlesPrix['Soins Infirmier'][format];
            break;
        case 'Cycle de la vie et grande fonction (UE 2.2 S1)':
            prix = articlesPrix['Cycle de la vie et grande fonction (UE 2.2 S1)'][format];
            break;
        case 'Biologie fondamentale (UE 2.1 S1)':
            prix = articlesPrix['Biologie fondamentale (UE 2.1 S1)'][format];
            break;
        case 'Processus traumatique (UE 2.4 S1)':
            prix = articlesPrix['Processus traumatique (UE 2.4 S1)'][format];
            break;
        case 'Processus psychopathologique (UE 2.6 S2)':
            prix = articlesPrix['Processus psychopathologique (UE 2.6 S2)'][format];
            break;
        case 'Processus psychopathologique (UE 2.6 S5)':
            prix = articlesPrix['Processus psychopathologique (UE 2.6 S5)'][format];
            break;
        case 'Processus obstructif (UE 2.8 S3)':
            prix = articlesPrix['Processus obstructif (UE 2.8 S3)'][format];
            break;
        case 'Processus infectieux (UE 2.5 S3)':
            prix = articlesPrix['Processus infectieux (UE 2.5 S3)'][format];
            break;
        case 'Processus dégénératif (UE 2.7 S4)':
            prix = articlesPrix['Processus dégénératif (UE 2.7 S4)'][format];
            break;
        case 'Les processus tumoraux (UE 2.9 S5)':
            prix = articlesPrix['Les processus tumoraux (UE 2.9 S5)'][format];
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
