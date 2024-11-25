<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/consentement.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script src="./../js/panier.js"></script>

</head>

<body>

    <!-- Header -->
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg"
                alt="Icon-page"></a>
        <div id="vide"></div>
        <h1>Les cahiers d'une infirmière</h1>
        <div id="entete">
            <a href="Contact.php">CONTACT</a>
        </div>
        <span class="panier-link">
            <img src="../Images/panier.svg" alt="panier">
            <span class="nombre-articles-panier" id="panier-bulle">0</span>
        </span>
    </header>
    <main>
   