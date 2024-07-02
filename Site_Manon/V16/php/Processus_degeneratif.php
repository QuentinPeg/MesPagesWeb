<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Processus dégénératif</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Processus_degeneratif.png" alt="Image 1">
            <img src="../Images/Processus_degeneratif1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Processus dégénératif (UE 2.7 semestre 4)
            </h2>
            <p>Description : <br>
                Ce pack correspond à l’unité d’enseignement 2.7. Sur une trame (définition, facteurs favorisants,
                signes cliniques, examens complémentaires, axes thérapeutiques et complications) Vous pourrez
                ainsi aborder les maladies dégénératives pour mieux les comprendre. Une fois diplômé ses fiches
                pourront vous servir comme penses bêtes lorsque vous serez dans une situation avec une
                pathologie dégénérative.
            </p>

            <p>Ce pack regroupe :</p>
            <ul>
                <li>Insuffisance hépatique-cirrhose</li>
                <li>Insuffisance rénale aiguë</li>
                <li>Insuffisance rénale chronique</li>
                <li>Insuffisance respiratoire aiguë</li>
                <li>Insuffisance respiratoire chronique</li>
                <li>Insuffisance cardiaque</li>
                <li>Alzheimer</li>
                <li>Parkinson</li>
                <li>Epilepsie</li>
                <li>Sclérose latérale amyotrophique</li>
                <li>Sclérose en plaque</li>
                <li>Ostéoporose</li>
                <li>Arthrose</li>
                <li>Spécificités de l’arthrose</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>Diabète de type I</li>
                <li>Diabète de type II</li>
                <li>Hyperthyroïdie</li>
                <li>Hypothyroïdie</li>
                <li>Plaie</li>
                <li>Brûlures</li>
                <li>Ulcères veineux</li>
                <li>Ulcères artériels</li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 30 €</li>
                <li>A5 : 38 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article"
                    onclick="addToCart('Processus dégénératif (UE 2.7 semestre 4)', 1, 'A5', 'Non')">Ajouter au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>