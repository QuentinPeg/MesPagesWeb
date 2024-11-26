<?php include 'header.php' ?>
<link rel="stylesheet" href="../css/Contact.css">
<title>NOM SITE</title>

<main>
    <h1>UNE ERREUR EST SURVENUE</h1>
    <p>Aucun montant ne vous a été débité, en cas de doute, veuillez nous contacter avec le formulaire suivant.
        (Erreur : <span id="error-message"><?php echo isset($_GET['error']) ? htmlspecialchars($_GET['error']) : 'Erreur inconnue'; ?></span>)
    </p>
    <h1>Me suivre ou me contacter</h1>
    <form method="POST" class="contact-form">
        <h2>Via le formulaire</h2>
        <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" name="name" placeholder="Nom*" required>
        </div>
        <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" placeholder="Email*" required>
        </div>

        <div class="form-group">
            <label for="message">Message :</label>
            <textarea id="message" name="message" placeholder="Votre message*" required></textarea>
        </div>
        <button type="button" class="submit-btn" onclick="mailForm()">Envoyer</button>
    </form>
    <h2>Par mail</h2>
    <p class="contact-info">Si vous souhaitez nous contacter par e-mail, vous pouvez le faire à l'adresse suivante :
        <span class="mail-contact">ADRESSEMAIL</span>
    </p>
</main>

<script>
    function mailForm() {
        (function () {
            emailjs.init("ixOrs32Cy-jH_Xqoi");
        })();

        var nom = document.querySelector("#name").value;
        var email = document.querySelector("#email").value;
        var mess = document.querySelector("#message").value;

        var message = `Message de ${nom} ,
        Adresse de contact du clent : ${email},
        message : ${mess}`;

        var parms = {
            sendername: nom,
            replyto: email,
            message: message
        };

        var serviceID = "service_b1jfzdk";
        var templateID = "template_3hz2tlr";

        emailjs.send(serviceID, templateID, parms)
            .then(res => {
                alert("Message envoyé ! \n (Nous répondons généralement en moins d'une semaine)");
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi :", error);
            });
    }
</script>

<?php include 'footer.php'; ?>
