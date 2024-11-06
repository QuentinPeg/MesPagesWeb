<!DOCTYPE php>
<php lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../Images/Icon-page.png">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../Css/Carrousel1.css" />
    <link rel="stylesheet" type="text/css" href="../Css/Carrousel2.css" />
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/article.css">


    <title>Soins Infirmier</title>
</head>

<body>

    <!-- Header -->
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg"
                alt="Icon-page"></a>
        <h1>Les cahiers d'une infirmière</h1>
        <div id="entcontact">
            <a href="Contact.php">CONTACT</a>
        </div>
    </header>
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
                    des soins réaliser. Il vous servira également une fois diplômé d’aide mémoire pour les soins. Une
                    fois professionnel vous pourrez vous en servir pour vous rafraîchir la mémoire si un étudiant vous
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
                    <a href="index.php"><button class="btn-retour">Voir d'autres
                            articles</button></a>
                    <!--<button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>-->
                </section>
            </section>
        </article>
    </main>
    <footer>
        <p>Une petite note sur moi :
            J'ai été étudiante infirmière, c'est à ce moment-là que ces fiches ont été créées. La base de ces fiches
            s'est construit sur les apports théoriques vus en cours et en stage ainsi les apports que j'ai pu voir et
            apprendre
            en stage.
            Ces fiches m'ont permis d'étudier et de réviser mes partiels pendant mes trois années de formation,
            et m'ont conduite jusqu'à l'obtention de mon diplôme. Une fois diplômée j'ai travaillé en service d'urgence
            puis en hospitalisation à domicile.</p>
        <h2>Merci de votre visite​​ ! A bientôt​​ !</h2>
        <div>
            <a href="../php/conditions&mentions.php">
                <p>Coder par Peguin Quentin</p>
            </a>
            <a href="../php/conditions&mentions.php">
                <p>&copy; Tout droit d'auteur réservé</p>
            </a>
            <a href="../php/conditions&mentions.php">
                <p>Conditions d'utilisation & Mentions légales</p>
            </a>
    </footer>
</body>


<script>window.addEventListener("scroll", function () {
        var header = document.querySelector("header");
        var h1 = document.querySelector("h1");
        var a = document.querySelector("#entcontact>a");
        var imgipage = document.querySelector("img");

        if (window.scrollY > 50) {
            header.classList.add("shrink");
            h1.classList.add("shrink");
            a.classList.add("shrink");
            imgipage.classList.add("shrink");

        } else {
            header.classList.remove("shrink");
            h1.classList.remove("shrink");
            a.classList.remove("shrink");
            imgipage.classList.remove("shrink");

        }
    });
</script>
<script>
    var carousel = document.getElementById('carousel');
    var scrollAmount = 0;
    var scrollTime = 10000; // Temps de défilement en millisecondes

    function rotateImages() {
        scrollAmount++;
        if (scrollAmount >= carousel.childElementCount) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    function prevImage() {
        scrollAmount--;
        if (scrollAmount < 0) {
            scrollAmount = carousel.childElementCount - 1;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    function nextImage() {
        scrollAmount++;
        if (scrollAmount >= carousel.childElementCount) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    setInterval(rotateImages, scrollTime);
</script>

<script>
    // Attendre que le contenu de la page soit chargé
    document.addEventListener("DOMContentLoaded", function () {
        // Sélectionner la div à supprimer en utilisant un sélecteur CSS
        var divASupprimer = document.querySelector('div[style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"]');

        // Vérifier si la div existe
        if (divASupprimer) {
            // Supprimer la div
            divASupprimer.parentNode.removeChild(divASupprimer);
        } else {
            console.log("La div spécifiée n'existe pas.");
        }
    });
</script>
</php>