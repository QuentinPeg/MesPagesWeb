<?php include 'header.php'; ?>

<link rel="stylesheet" href="../css/paiement.css">
<title>Les cahiers d'une infirmière</title>

<main>
    <h1>Merci de votre commande</h1>
    <p>Votre commande a été acceptée, elle sera préparée et envoyée au cours de la semaine, nous vous recontacterons si nécessaire...</p>
    <a href="index.php">
        <img src="../Images/Logolescahiersduneinfirmiere.jpg" alt="Les cahiers d'une infirmière"></a>

    <p>Pour revenir à la page d'accueil, cliquez sur le bouton ci-dessous</p>
    <section>
        <a href="index.php"><button class="btn-retour">Accueil</button></a>
    </section>
</main>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        envoyerMail();
    });

    function envoyerMail() {
        let storedMailData = localStorage.getItem('mailData');
        if (storedMailData) {
            let mailData = JSON.parse(storedMailData);

            emailjs.init("ixOrs32Cy-jH_Xqoi");

            let serviceID = "service_b1jfzdk";
            let templateID = "template_qcjv2ql";

            emailjs.send(serviceID, templateID, mailData)
                .then(res => {
                    alert("Précommande envoyée !\n Nous vous recontacterons sous 3 jours \n (envoi de la commande en moins d'une semaine)");
                    localStorage.removeItem('mailData');
                })
                .catch(error => {
                    alert("Une erreur est survenue lors de l'envoi du mail de la précommande,\n Veuillez nous excuser, si le paiement a bien été confirmé, veuillez nous contacter pour confirmer la commande. \n > Page Contact > :", error);
                });
        } else {
            console.log("Aucune donnée à envoyer.");
        }
    }
</script>
<?php include 'footer.php'; ?>
