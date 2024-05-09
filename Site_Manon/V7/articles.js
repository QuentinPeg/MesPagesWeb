// Définissez les prix des articles
var articlesPrix = {
    'Les processus tumoraux (UE 2.9 S5)': {
        'A6': 35,
        'A5': 43
    },
    'Pack première année': {
        'A6': 86,
        'A5': 117
    },
    'Pack semestre 1': {
        'A6': 69,
        'A5': 92
    },
    'Pack deuxième année': {
        'A6': 99,
        'A5': 130
    },
    'Pack semestre 3': {
        'A6': 71,
        'A5': 86
    },
    'Pack troisième année': {
        'A6': 69,
        'A5': 96
    },
    'Pathologie infectieuses (UE 2.5 S3)': {
        'A6': 38,
        'A5': 46
    },
    'Processus dégénératif (UE 2.7 S4)': {
        'A6': 30,
        'A5': 38
    },
    'Processus psychopathologique1 (UE 2.6 S2-S5)': {
        'A6': 30,
        'A5': 38,
    },
    'Processus psychopathologique2 (UE 2.6 S2-S5)': {
        'A6': 18,
        'A5': 26
    },
    'Processus traumatique (UE 2.4 S1)': {
        'A6': 23,
        'A5': 31
    },
    'Biologie fondamentale (UE 2.1 S1)': {
        'A6': 20,
        'A5': 28
    },
    'Cycle de la vie et grande fonction (UE 2.2 S1)': {
        'A6': 30,
        'A5': 38
    },
    'Divers soins infirmiers (UE 4.3 S2-S4 ; UE 4.4 S2-S4)': {
        'A6': 35,
        'A5': 43
    },
    'Pharmacologie (UE 2.11 S1-S3-S5)': {
        'A6': 38,
        'A5': 46,
        'A6_2': 20,
        'A5_2': 28
    }
};

// Fonction pour obtenir le prix d'un article donné et un format donné
function obtenirPrixArticle(article, format) {
    return articlesPrix[article] && articlesPrix[article][format] ? articlesPrix[article][format] : 0;
}

// Fonction pour calculer le total du panier
function calculerTotal() {
    var panierListe = document.getElementById('panier-liste');
    var total = 0;

    for (var i = 0; i < panierListe.children.length; i++) {
        var articleElement = panierListe.children[i];
        var nomArticle = articleElement.firstChild.textContent.trim();
        var selectFormat = articleElement.querySelector('select[id^="choixFormat"]');
        var selectPlastifie = articleElement.querySelector('select[id^="xd"]');

        var format = selectFormat ? selectFormat.value : 'A6';
        var plastifie = selectPlastifie ? selectPlastifie.value : 'Non';

        // Mettre à jour le total en fonction du prix de l'article, du format et de l'option plastifiée
        total += obtenirPrixArticle(nomArticle, format);

        // Ajouter 10 euros pour l'option plastifiée
        if (plastifie === 'Oui') {
            total += 10;
        }
    }

    // Afficher le total
    document.getElementById('panier-total').textContent = total + ' euros';
}
