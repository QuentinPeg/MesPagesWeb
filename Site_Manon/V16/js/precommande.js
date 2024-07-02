function fermerPrecommande() {
    var precommandeFenetre = document.getElementById('precommande-fenetre');
    precommandeFenetre.style.display = 'none';
}

function afficherRecapArticles() {
    var recapArticlesDiv = document.getElementById('recap-articles');
    recapArticlesDiv.textContent = '';

    fetch('afficher_panier.php')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const items = doc.querySelectorAll('li');

            items.forEach(item => {
                const form = item.querySelector('form');
                if (form) {
                    const productTitle = form.querySelector('input[name="product_title"]').value;
                    const format = form.querySelector('input[name="format"]').value;
                    const plastifie = form.querySelector('input[name="plastifie"]').value;
                    const quantity = parseInt(form.textContent.match(/\d+/)[0], 10);

                    const articleText = `[${quantity}] x ${productTitle}`;

                    const articleElement = document.createElement('p');
                    articleElement.id = `${productTitle}-${format}-${plastifie}`;
                    articleElement.textContent = articleText;

                    const labelFormat = document.createElement('label');
                    labelFormat.textContent = 'Format :';
                    const selectFormat = createFormatSelect(productTitle, quantity, `${productTitle}-${format}-Format`, format);

                    const labelPlastifie = document.createElement('label');
                    labelPlastifie.textContent = 'Plastifié :';
                    const selectPlastifie = createPlastifieSelect(productTitle, quantity, `${productTitle}-${plastifie}-Plastifie`, plastifie);

                    selectFormat.setAttribute('data-format', format);
                    selectPlastifie.setAttribute('data-plastifie', plastifie);

                    articleElement.appendChild(labelFormat);
                    articleElement.appendChild(selectFormat);
                    articleElement.appendChild(labelPlastifie);
                    articleElement.appendChild(selectPlastifie);

                    recapArticlesDiv.appendChild(articleElement);
                }
            });
        })
        .catch(error => console.error("Erreur lors du chargement des articles :", error));

    calculerTotal;
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
        var key = event.target.getAttribute('data-key');
        var articleId = key.split('-')[0];
        var plastifie = document.querySelector(`select[data-nom="${nom}"][data-plastifie]`).value;

        // Update cart with new format
        updateCart('update_format', nom, selectedFormat, plastifie);
    });
    calculerTotal;

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
        var key = event.target.getAttribute('data-key');
        var articleId = key.split('-')[0];
        var format = document.querySelector(`select[data-nom="${nom}"][data-format]`).value;

        // Update cart with new plastification
        updateCart('update_plastifie', nom, format, selectedPlastifie);
    });
    calculerTotal;

    return selectPlastifie;
}




function calculerTotal() {
    var total = 0;
    // Récupérer tous les éléments de l'article dans le récapitulatif
    const articles = document.querySelectorAll('#recap-articles > p');

    articles.forEach(article => {
        const id = article.id;
        const quantity = parseInt(article.textContent.match(/\[(\d+)\]/)[1], 10);
        const format = article.querySelector('select[data-format]').value;
        const plastifie = article.querySelector('select[data-plastifie]').value;

        // Utiliser l'ID pour extraire le nom de l'article pour obtenir le prix
        const nomArticle = id.split('-')[0];
        var prixUnitaire = obtenirPrixArticle(nomArticle, format);

        // Appliquer la logique de plastification
        if (plastifie === 'Oui') {
            prixUnitaire += prixUnitaire * 0.10; // Augmentez le prix de 10% si plastifié
        }

        total += prixUnitaire * quantity;
    });

    // Mettre à jour le total dans l'élément HTML correspondant
    document.getElementById('amount').value = total;
    document.getElementById("prixTotal").textContent = formaterPrix(total);
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

function formaterPrix(prix) {
    return prix % 1 !== 0 ? prix.toFixed(2).replace('.', ',') + ' €' : prix.toFixed(0) + ' €';
}

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

// Fonction pour ajouter un article au panier
function addToCart(id, quantity, format, plastifie) {
    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'product_id=' + encodeURIComponent(id) +
            '&quantity=' + encodeURIComponent(quantity) +
            '&format=' + encodeURIComponent(format) +
            '&plastifie=' + encodeURIComponent(plastifie)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                mettreAJourNombreArticlesPanier();
            } else {
                console.error('Error adding item to cart:', data.message);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    calculerTotal();
}
function showCart() {
    var modal = document.getElementById('panier-fenetre');
    modal.style.display = 'block';
    fetch('afficher_panier.php')
        .then(response => response.text())
        .then(data => document.getElementById('panier-liste').innerHTML = data);
    calculerTotal();
}

function clearCart() {
    const formData = new FormData();
    formData.append('action', 'clear_cart');
    fetch('afficher_panier.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => document.getElementById('panier-liste').innerHTML = data);
    mettreAJourNombreArticlesPanier();
}
// Mettre à jour le nombre d'articles dans la bulle du panier dans l'en-tête
function mettreAJourNombreArticlesPanier() {
    var bullePanier = document.getElementById('panier-bulle');

    fetch('afficher_panier.php')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const items = doc.querySelectorAll('li');
            let totalQuantity = 0;

            items.forEach(item => {
                const text = item.textContent;
                const match = text.match(/-\s*(\d+)\s*\+/);
                if (match && match[1]) {
                    const quantity = parseInt(match[1], 10);
                    totalQuantity += quantity;
                }
            });
            bullePanier.textContent = totalQuantity;

            if (totalQuantity > 0) {
                bullePanier.style.display = 'block';
            } else {
                bullePanier.style.display = 'none';
            }
        })
        .catch(error => console.error("Erreur lors de la mise à jour du nombre d'articles :", error));
    afficherRecapArticles();
}


function updateCart(action, productTitle, format, plastifie) {
    fetch('afficher_panier.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=${action}&product_title=${encodeURIComponent(productTitle)}&format=${encodeURIComponent(format)}&plastifie=${encodeURIComponent(plastifie)}`
    })
    .then(response => response.json())
    .then(cart => {
        // Re-render the cart items
        mettreAJourNombreArticlesPanier(); // Ensure this function is called to update the cart bubble
        showCart();
        calculerTotal(); // Recalculate the total
    })
    .catch(error => console.error('Erreur lors de la mise à jour du panier:', error));
}





// Mettre à jour le nombre d'articles dans la bulle de l'en-tête au chargement de la page
window.addEventListener('load', mettreAJourNombreArticlesPanier);

function obtenirNombreArticlesPanier() {
    var bullePanier = document.getElementById('panier-bulle');
    var nombreArticles = parseInt(bullePanier.textContent, 10);
    return isNaN(nombreArticles) ? 0 : nombreArticles;
}

function afficherPrecommande() {
    var nombreArticles = obtenirNombreArticlesPanier();

    if (!validerOuverturePreco(nombreArticles)) {
        return;
    }

    var precommandeFenetre = document.getElementById('precommande-fenetre');
    var panierFenetre = document.getElementById('panier-fenetre');

    masquerPanier();

    precommandeFenetre.style.display = 'flex';
    calculerTotal();

    afficherRecapArticles();
}

function validerOuverturePreco(nombreArticles) {
    if (nombreArticles === 0) {
        alert('Votre panier est vide. Veuillez ajouter des articles.');
        return false;
    }

    if (nombreArticles > 10) {
        alert('Vous ne pouvez pas avoir plus de 10 articles dans votre panier.');
        return false;
    }

    return true;
}

function masquerPanier() {
    var panierFenetre = document.getElementById('panier-fenetre');
    panierFenetre.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        const panierLink = document.querySelector('.panier-link');
        const panier = document.getElementById('panier-fenetre');

        if (!panierLink.contains(event.target) && !panier.contains(event.target)) {
            panier.style.display = 'none';
        }
    });

    const panierLink = document.querySelector('.panier-link');
    panierLink.addEventListener('click', function (event) {
        const panier = document.getElementById('panier-fenetre');
        panier.style.display = 'block';
    });
});

var boutonsSupprimerTout = document.getElementsByClassName('btn-supprimer-tout');

Array.from(boutonsSupprimerTout).forEach(function (bouton) {
    bouton.addEventListener('click', function () {
        fetch('afficher_panier.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=clear_cart'
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('panier-liste').innerHTML = data;
                mettreAJourNombreArticlesPanier();
            })
            .catch(error => console.error('Erreur:', error));
    });
});
