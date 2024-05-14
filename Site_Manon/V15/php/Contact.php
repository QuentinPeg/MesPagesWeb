<?php include 'header.php' ?>
<link rel="stylesheet" href="../css/Contact.css">
<title>Les cahiers d'une infirmière</title>

<main>
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
            <span class="mail-contact">lescahiersduneinfirmiere@gmail.com</span>
        </p>

        <h2>Mes réseaux</h2>

        <h3>Sur Instagram</h3>
        <p class="contact-info">Si vous souhaitez nous contacter ou nous suivre sur Instagram, vous pouvez
            <a href="https://www.instagram.com/lescahiersduneinfirmiere/" target="_blank">cliquer ici</a>.
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
                console.error("Une erreur est survenu lors de l'envoi ,\n Veuillez nous excuser si le problème persiste contacter le support par un autre moyen. \n Contact > adresse mail du support:", error);
            });
    }

</script>

<?php include 'footer.php' ?>