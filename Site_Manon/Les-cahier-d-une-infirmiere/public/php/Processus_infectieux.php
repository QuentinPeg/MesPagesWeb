<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Processus infectieux</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Processus_infectieux.png" alt="Image 1">
            <img src="../Images/Processus_infectieux1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Processus infectieux (UE 2.5 semestre 3)
            </h2>
            <p>Description : <br>
                Ce pack correspond à l’unité d’enseignement 2.8. Il permet d’étudier et ou de réviser les
                pathologies obstructives au quelle l’organisme peut être confronter. Sur une trame (définition,
                facteurs favorisants, signes cliniques, examens complémentaires, axes thérapeutiques et
                complications) vous pourrez ainsi comprendre la pathologie. Une fois professionnel vous pourrez
                vous en servir pour vous rafraîchir la mémoire, lorsqu’un patient se présentera à vous avec l’une
                de ses pathologies.
            </p>

            <p>Ce pack regroupe :</p>
            <ul>
                <li>Grippe</li>
                <li>Infection urinaire</li>
                <li>Méningite</li>
                <li>Méningo-encéphalite</li>
                <li>Paludisme</li>
                <li>Endocardite</li>
                <li>Abcès cérébraux</li>
                <li>Appendicite</li>
                <li>Cholecystite</li>
                <li>Pancréatite</li>
                <li>Angiocholite</li>
                <li>Sigmoïdite</li>
                <li>Péritonite</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>Hépatite</li>
                <li>Tuberculose</li>
                <li>Trachéite</li>
                <li>Maladie inflammatoire chronique de l’intestin</li>
                <li>Pneumonie infectieuse</li>
                <li>Bronchite infectieuse aiguë</li>
                <li>Bronchiolite</li>
                <li>Polyarthrite rhumatoïde</li>
                <li>Infection ostéo articulaire</li>
                <li>Infection ostéo articulaire à staphylocoque</li>
                <li>VIH</li>
                <li>Lupus</li>
                <li>Spondylarthrite ankylosante</li>
                <li>Rhumatisme psoriasique</li>
                <li>Salpingite</li>
                <li>Urétérite</li>
                <li>Syphilis</li>
                <li>Herpès génital</li>
                <li>Infection HPV</li>
            </ul>

            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 38 €</li>
                <li>A5 : 46 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <!--<button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>-->
            </section>
        </section>
    </article>
</main>

<?php include 'footer.php'; ?>