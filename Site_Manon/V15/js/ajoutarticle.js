document.addEventListener("DOMContentLoaded", function () {
    // Charger les articles depuis le fichier JSON
    fetch("../js/articles.json")
        .then(response => response.json())
        .then(articles => {
            // Filtrer les articles en packs et non packs
            const packs = articles.filter(article => article.estPack);
            const nonPacks = articles.filter(article => !article.estPack);

            // Afficher les articles packs dans la première section
            afficherArticles(packs, "packs");

            // Afficher les articles non packs dans la deuxième section
            afficherArticles(nonPacks, "nonpacks");

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

        const priceA6 = document.createElement("li")
        priceA6.textContent = "Prix : " + article.prix.A6 + " € (A6)";
        price.appendChild(priceA6);

        const priceA5 = document.createElement("li")
        priceA5.textContent = "Prix : " + article.prix.A5 + " € (A5)";
        price.appendChild(priceA5);
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
            ajouterAuPanier(article.titre, article.format, article.plastifie);
        };
        
        sectionbutton.appendChild(buttonadd);

        articleDiv.appendChild(sectionbutton);

        section.appendChild(articleDiv);
    });
}



