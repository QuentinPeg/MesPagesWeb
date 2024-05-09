/*function fermerPrecommande() {
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
      var format = article.format;
      var plastifie = article.plastifie;
  
      var key = `${nom}-${format}-${plastifie}`;
      var articleText = quantite > 1 ? `[${quantite}] x ${nom}` : nom;
  
      var articleElement = document.createElement('p');
      articleElement.textContent = articleText;
  
      var labelFormat = document.createElement('label');
      labelFormat.textContent = 'Format :';
      var selectFormat = document.createElement('select');
      selectFormat.name = 'format';
      selectFormat.dataset.key = key;
  
      var optionA6 = document.createElement('option');
      optionA6.value = 'A6';
      optionA6.textContent = 'A6';
      if (format === 'A6') {
        optionA6.selected = true;
      }
      selectFormat.appendChild(optionA6);
  
      var optionA5 = document.createElement('option');
      optionA5.value = 'A5';
      optionA5.textContent = 'A5';
      if (format === 'A5') {
        optionA5.selected = true;
      }
      selectFormat.appendChild(optionA5);
  
      var labelPlastifie = document.createElement('label');
      labelPlastifie.textContent = 'Plastifié :';
      var selectPlastifie = document.createElement('select');
      selectPlastifie.name = 'plastifie';
      selectPlastifie.dataset.key = key;
  
      var optionPlastifie = document.createElement('option');
      optionPlastifie.value = 'true';
      optionPlastifie.textContent = 'Oui';
      if (plastifie) {
        optionPlastifie.selected = true;
      }
      selectPlastifie.appendChild(optionPlastifie);
  
      var optionNonPlastifie = document.createElement('option');
      optionNonPlastifie.value = 'false';
      optionNonPlastifie.textContent = 'Non';
      if (!plastifie) {
        optionNonPlastifie.selected = true;
      }
      selectPlastifie.appendChild(optionNonPlastifie);
  
      articleElement.appendChild(labelFormat);
      articleElement.appendChild(selectFormat);
      articleElement.appendChild(labelPlastifie);
      articleElement.appendChild(selectPlastifie.appendChild(optionNonPlastifie));
  
      recapArticlesDiv.appendChild(articleElement);
    }
  }
  
  afficherRecapArticles();


function calculerTotal() {
    var total = 0;

    for (var i = 0; i < panier.length; i++) {
        var article = panier[i];

        // Utilisez le format et la plastification de la fenêtre flottante de la précommande s'ils existent
        var formatSelect = document.querySelector(`select[data-nom="${article.nom}"][data-quantite="${article.quantite}"]`);
        var plastifieSelect = document.querySelector(`select[data-nom="${article.nom}"][data-quantite="${article.quantite}"][data-key="${article.format}-${article.plastifie}"]`);

        // Assurez-vous que les sélecteurs existent avant de récupérer les valeurs
        var format = formatSelect ? formatSelect.value : article.format;
        var plastifie = plastifieSelect ? plastifieSelect.value : article.plastifie;

        // Condition de plastification
        var prixUnitaire = obtenirPrixArticle(article.nom, format, plastifie);
        var prixUnitairePlastifie = obtenirPrixArticle(article.nom, format, 'Oui');

        if (plastifie === 'Oui') {
            console.log('Condition de plastification atteinte');
            // Augmentez le prix de 10% par rapport au prix plastifié
            prixUnitaire += prixUnitaire * 0.10;
            article.plastifie='Non';
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
}*/
