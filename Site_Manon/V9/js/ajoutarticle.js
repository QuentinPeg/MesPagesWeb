document.addEventListener("DOMContentLoaded", function () {
  // Charger les articles depuis le fichier JSON
  fetch("../js/articles.json")
    .then(response => response.json())
    .then(articles => {
      // Filtrer les articles en packs et non packs
      const packs = articles.filter(article => article.estPack);
      const nonPacks = articles.filter(article => !article.estPack);
      const quantite = articles.filter(article => !article.quantité == 0)

      // Afficher les articles packs dans la première section
      afficherArticles(packs, "packs");

      // Afficher les articles non packs dans la deuxième section
      afficherArticles(nonPacks, "nonpacks");

      //Ajouter au panier les articles ayant plus de 0 en quantité

    })
    .catch(error => console.error("Erreur lors du chargement des articles :", error));

});

function afficherArticles(articles, sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error("L'élément avec l'ID " + sectionId + " n'existe pas dans le DOM.");
    return;
  }
  section.innerHTML = "";

  articles.forEach(article => {
    const articleDiv = document.createElement("article");
    articleDiv.id = article.id;

    const image = document.createElement("img");
    image.src = article.imageSrc;
    articleDiv.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = article.titre;
    articleDiv.appendChild(title);

    const price = document.createElement("ul");
    const priceA5 = document.createElement("li")
    priceA5.textContent = "Prix : " + article.prix.A5 + " € (A5)";
    price.appendChild(priceA5);

    const priceA6 = document.createElement("li")
    priceA6.textContent = "Prix : " + article.prix.A6 + " € (A6)";
    price.appendChild(priceA6);
    articleDiv.appendChild(price);

    const sectionbutton = document.createElement("section");

    const link = document.createElement("a");
    link.href = article.lien;

    const buttoninf = document.createElement("button");
    buttoninf.classList.add("btn-info");
    buttoninf.textContent = ("Plus d'information");
    link.appendChild(buttoninf);
    sectionbutton.appendChild(link);

    const buttonadd = document.createElement("button");
    buttonadd.classList.add("btn-ajouter-panier");
    buttonadd.textContent = "Ajouter au panier";
    buttonadd.onclick = function () {
      ajouterAuPanier(article.titre);
    };
    sectionbutton.appendChild(buttonadd);

    articleDiv.appendChild(sectionbutton);

    section.appendChild(articleDiv);
  });
}
function afficherPanier() {
  var panierFenetre = document.getElementById('panier-fenetre');
  panierFenetre.style.display = 'flex';
  document.addEventListener('click', fermerPanierSiClicExterieur);
  // Mettre à jour le total
  calculerTotal();
}

function ajouterElementAuPanier(article) {
  var panierListe = document.getElementById('panier-liste');
  var nouvelArticle = document.createElement('li');

  // Ajout du bouton de suppression avec un appel à la fonction supprimerArticle
  nouvelArticle.innerHTML = `
      [${article.quantite}] ${article.nom}
      <button class="btn-supprimer-article" onclick="supprimerArticle(event, this)">&#10006;</button>
        `;

  panierListe.appendChild(nouvelArticle);
}

function ajouterAuPanier(titre, format = 'A5', plastif = false) {
  var existe = panier.find(articles => articles.titre == titre && articles.format == format && articles.estplastifie == plastif)
  if (existe) {
    existe.quantite++;
    existe.prix = existe.prix * existe.quantite;
    mettreAJourQuantiteArticle(articleExistant);
  } else {
    var nouvelArticle = {
      nom: titre,
      format: format,
      plastifie: false,
      quantite: 1,
  }

}

/* 

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

function mettreAJourNombreArticlesPanier() {
   var nombreArticlesPanier = document.getElementById('panier-liste').childElementCount;
   var bullePanier = document.getElementById('panier-bulle');

   // Mettre à jour le contenu de la bulle avec le nombre d'articles
   bullePanier.textContent = nombreArticlesPanier;

   // Afficher ou masquer la bulle en fonction du nombre d'articles
   bullePanier.style.display = nombreArticlesPanier > 0 ? 'flex' : 'none';
 }
 }
*/

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
document.querySelector('.panier-link').addEventListener('click', togglePanier);
}