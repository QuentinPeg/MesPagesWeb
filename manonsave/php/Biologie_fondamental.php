<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Biologie fondamentale</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Biologie_fondamental.png" alt="Image 1">
            <img src="../Images/Biologie_fondamental1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Biologie fondamentale (UE 2.1 semestre 1)</h2>
            <p>Description : <br>
                Ce pack regroupe l’ensemble des apport théorique de l’unité d’enseignement 2.1. De
                manière
                synthétique, il regroupe l’essentiel à savoir sur la biologie, le fonctionnement et le
                développement.
                Une fois professionnel vous pourrez vous en servir pour vous rafraîchir la mémoire si un étudiant
                vous pose une question ou si vous avez un trou de mémoire.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li>La cellule</li>
                <li>La chimie du vivant</li>
                <li>L’ADN support de l’information génétique</li>
                <li>De l’ADN aux protéines</li>
                <li>Les pathologies et génétiques moléculaires</li>
                <li>La biochimie des acides aminés</li>
                <li>La biochimie des protéines et des enzymes</li>
                <li>Les glucides, structure et grande fonction</li>
                <li>La généralité sur la diététique</li>
                <li>L’homéostasie</li>
                <li>La bioénergétique : introduction au métabolisme</li>
            </ul>

            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 20 €</li>
                <li>A5 : 28 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="addToCart('Biologie fondamentale', 1, 'A5', 'Non')">Ajouter
                    au panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>