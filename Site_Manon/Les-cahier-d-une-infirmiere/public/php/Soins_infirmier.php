<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Soins Infirmier</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Soins_infirmier.png" alt="Image 1">
            <img src="../Images/Soins_infirmier1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Soins Infirmier</h2>
            <p>Description : <br>
                Le pack soins infirmiers regroupe un ensemble de fiches techniques utile à votre pratique
                infirmière. Ce pack pourra vous suivre tout au long de votre formation pour apprendre la théorie
                des soins réaliser. Il vous servira également une fois diplômé d’aide mémoire pour les soins.
                Une
                fois professionnel vous pourrez vous en servir pour vous rafraîchir la mémoire si un étudiant
                vous
                pose une question ou si vous avez un trou de mémoire.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li>Normes de références des éléments figurés du sang et des veines</li>
                <li>Les bilans sanguins les plus courants</li>
                <li>La voie veineuse périphérique</li>
                <li>La voie veineuse centrale</li>
                <li>Le cathéter artériel</li>
                <li>La gazométrie</li>
                <li>Les débits</li>
                <li>Les différents sites d’injections</li>
                <li>Les surveillances de la transfusion</li>
                <li>Le test de contrôle ultime ABtest Card®</li>
                <li>Valeurs et normes de références</li>
                <li>Les différentes hémorragies</li>
                <li>L’électrocardiogramme (ECG)</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>Les différentes techniques d’imagerie</li>
                <li>L’intubation orotrachéales</li>
                <li>La trachéotomie/ trachéostomie</li>
                <li>La sonde nasogastrique</li>
                <li>La sonde vésicale</li>
                <li>Les surveillances du drain de redon</li>
                <li>Les surveillances cliniques en réanimation</li>
                <li>La surveillance neurologique</li>
                <li>La surveillance respiratoire</li>
                <li>La ventilation non invasive VNI</li>
                <li>Les différents modes de ventilation</li>
                <li>Les différentes douleurs abdominales</li>
                <li>Les différentes douleurs thoraciques</li>
                <li>RASS</li>
                <li>Echelle BPS</li>
                <li>Score de Cushman</li>
                <li>L’oxygénation par membrane extra corporelle</li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 35 €</li>
                <li>A5 : 43 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="ajouterAuPanier('Soins Infirmier', 'A5', 'Non')">Ajouter au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>