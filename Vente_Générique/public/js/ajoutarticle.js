// Configuration Supabase
if (typeof supabase === 'undefined') {
    console.error('Supabase n’est pas chargé correctement.');
} else {
    const SUPABASE_URL = 'https://dquhqpoitxwaahkdrkfy.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxdWhxcG9pdHh3YWFoa2Rya2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMTc3NTcsImV4cCI6MjA0MTg5Mzc1N30.ayeOG1udDkkBM0yPNI1v9F8Eox_0s7ja-6UVtSgj1KE';

    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Charger et afficher les articles
    async function fetchArticles() {
        const { data: articles, error } = await supabaseClient
            .from('boutique')
            .select('*');

        if (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            return;
        }
        displayArticles(articles);
    }

    function displayArticles(articles) {
        const main = document.querySelector('#ajouter_articles_ici');
        main.innerHTML = ''; // Nettoyer les articles existants

        articles.forEach(article => {
            if (!article.image_url) return; // Si pas d'image, on l'ignore

            const articleHTML = `
                <div class="article" data-id="${article.id}">
                    <img src="${article.image_url}" class="img-article" alt="${article.nom}" data-id="${article.id}">
                    <h2 class="titre-article" data-id="${article.id}">${article.nom}</h2>
                    <span class="prix-article">${article.prix} €</span>
                    <button class="add-to-cart-btn" data-id="${article.id}">Ajouter au panier</button>
                </div>
                `;
            main.insertAdjacentHTML('beforeend', articleHTML);
        });

        // Ajout des écouteurs de clic pour ouvrir la modale
        document.querySelectorAll('.article').forEach(el => {
            el.addEventListener('click', openModal);
        });

        // Écouteurs pour le bouton "Ajouter au panier"
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }

    // Ouvrir la modale
    function openModal(event) {
        // Vérifier si l'élément cliqué est un bouton "Ajouter au panier"
        if (event.target.classList.contains('add-to-cart-btn')) return;

        const articleId = event.currentTarget.getAttribute('data-id');
        fetchArticleDetails(articleId);
    }

    // Récupérer les détails de l'article depuis Supabase
    async function fetchArticleDetails(id) {
        const { data: article, error } = await supabaseClient
            .from('boutique')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !article) {
            console.error('Erreur lors de la récupération de l\'article:', error);
            return;
        }

        // Afficher les détails dans la modale
        document.getElementById('modal-image').src = article.image_url;
        document.getElementById('modal-title').textContent = article.nom;
        document.getElementById('modal-description').textContent = article.description;
        document.getElementById('modal-price').textContent = `Prix : ${article.prix.toFixed(2)} €`;
        document.getElementById('add-to-cart-modal').setAttribute('data-id', article.id);

        // Afficher la modale
        document.getElementById('article-modal').style.display = 'block';
    }

    // Ajouter un article au panier depuis la modale
    function addToCart(event) {
        const articleId = event.target.getAttribute('data-id');
        console.log(`Ajouter l'article avec ID ${articleId} au panier.`);

        // Ajouter l'article au panier local (localStorage)
        const article = document.querySelector(`.article[data-id="${articleId}"]`);
        const nomArticle = article.querySelector('.titre-article').textContent;
        const prixArticle = parseFloat(article.querySelector('.prix-article').textContent.replace('Prix : ', '').replace(' €', ''));

        ajouterAuPanier(nomArticle, prixArticle);

        // Fermer la modale après ajout
        document.getElementById('article-modal').style.display = 'none';
    }

    // Ajouter l'article au panier dans le localStorage
    function ajouterAuPanier(nomArticle, prix) {
        let panier = JSON.parse(localStorage.getItem('panier')) || [];

        const articleExistant = panier.find(article => article.nom === nomArticle);

        if (articleExistant) {
            articleExistant.quantite++;
        } else {
            panier.push({ nom: nomArticle, prix: prix, quantite: 1 });
        }

        localStorage.setItem('panier', JSON.stringify(panier));
        chargerPanierDepuisLocalStorage();
    }

    // Charger le panier depuis le localStorage
    function chargerPanierDepuisLocalStorage() {
        let panier = JSON.parse(localStorage.getItem('panier')) || [];
        afficherArticlesPanier(panier);
        mettreAJourNombreArticlesPanier(panier);
    }

    // Afficher les articles dans le panier
    function afficherArticlesPanier(panier) {
        const panierListe = document.getElementById('panier-liste');
        panierListe.innerHTML = '';

        panier.forEach(article => {
            const nouvelArticle = document.createElement('li');
            nouvelArticle.innerHTML = `
                    <span class="nom-article">${article.nom}</span> :
                    <button class="btn-quantite" onclick="modifierQuantite('${article.nom}', -1)">-</button>
                    <span class="quantite-article">${article.quantite}</span>
                    <button class="btn-quantite" onclick="modifierQuantite('${article.nom}', 1)">+</button>
                    <span class="prix-article">${(article.prix * article.quantite).toFixed(2)} €</span>
                    <button class="btn-supprimer-article" onclick="supprimerArticle('${article.nom}')">✖</button>
                `;
            panierListe.appendChild(nouvelArticle);
        });
    }

        // Mettre à jour le nombre d'articles dans le panier
        function mettreAJourNombreArticlesPanier(panier) {
            const bullePanier = document.getElementById('panier-bulle');
            const totalArticles = panier.reduce((total, article) => total + article.quantite, 0);

            bullePanier.textContent = totalArticles;
            bullePanier.style.display = totalArticles > 0 ? 'flex' : 'none';
        }

    // Fermer la modale
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('article-modal').style.display = 'none';
    });

    // Charger les articles dès que la page est prête
    document.addEventListener('DOMContentLoaded', fetchArticles);
}
// Modifier la quantité d'un article
function modifierQuantite(nomArticle, delta) {
    const article = panier.find(article => article.nom === nomArticle);
    if (article) {
        article.quantite += delta;
        if (article.quantite < 1) article.quantite = 1; // Empêche la quantité de devenir inférieure à 1
        localStorage.setItem('panier', JSON.stringify(panier));
        rechargerPanierDepuisLocalStorage();
    }
}
function supprimerArticle(nomArticle) {
    // Supprimer l'article du panier
    panier = panier.filter(article => article.nom !== nomArticle);
    localStorage.setItem('panier', JSON.stringify(panier));
    rechargerPanierDepuisLocalStorage(); // Recharge l'affichage du panier après suppression
}
// Charger le panier depuis le localStorage
function chargerPanierDepuisLocalStorage() {
    var panierStocke = localStorage.getItem('panier');
    if (panierStocke) {
        panier = JSON.parse(panierStocke); // Recharger les articles du panier depuis localStorage
        mettreAJourNombreArticlesPanier();
        panier.forEach(article => ajouterElementAuPanier(article)); // Ajouter chaque article au DOM
        document.getElementById("prixTotal").innerHTML = getPrixPanier(); // Mettre à jour le prix total
    }
}

// Exécuter au chargement de la page
window.addEventListener('DOMContentLoaded', chargerPanierDepuisLocalStorage);
