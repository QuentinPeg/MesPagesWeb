if (typeof supabase === 'undefined') {
    console.error('Supabase n’est pas chargé correctement.');
} else {

    const SUPABASE_URL = 'https://dquhqpoitxwaahkdrkfy.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxdWhxcG9pdHh3YWFoa2Rya2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMTc3NTcsImV4cCI6MjA0MTg5Mzc1N30.ayeOG1udDkkBM0yPNI1v9F8Eox_0s7ja-6UVtSgj1KE';
    
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Fonction pour récupérer les articles depuis Supabase
    async function fetchArticles() {
        const { data: articles, error } = await supabaseClient
            .from('boutique') // Assurez-vous que le nom de la table correspond exactement
            .select('*');
    
        if (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            return;
        }
    
        // Appel de la fonction pour afficher les articles
        displayArticles(articles);
    }
    
    // Fonction pour afficher les articles avec les images
    function displayArticles(articles) {
        const main = document.querySelector('#ajouter_articles_ici'); // Assurez-vous que l'élément a cet ID
    
        for (const article of articles) {
            // Vérifiez que l'article a bien une URL d'image
            if (!article.image_url) {
                console.warn('Aucune image URL pour cet article:', article);
                continue;
            }
    
            const articleHTML = `
            <div class="article">
                <div>
                    <img src="${article.image_url}" class="img-article" alt="Image de ${article.nom}">
                </div>
                <div>
                    <h2 class="titre-article">${article.nom}</h2>
                    <p class="description-article">${article.description.replace(/\n/g, '<br>')}</p>
                    <p class="prix-article">Prix : ${article.prix.toFixed(2)} €</p>
                </div>
            </div>
            `;
    
            // Ajouter chaque article dans le conteneur principal
            main.insertAdjacentHTML('beforeend', articleHTML);
        }
    }
    
    // Charger les articles dès que la page est prête
    document.addEventListener('DOMContentLoaded', fetchArticles);
    }
