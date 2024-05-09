let stripe = Stripe('pk_test_51OwO5gHzsfwOqlCRpTKi7JTAclf9Ndg4pARKDmuQWcwZgBaTWadxlbMk6GZgTDBRFjCsAI1RK9psGWtajO9ae6tm00zukXQCYC');
let elements = stripe.elements();

let style = {
  base: {
    fontSize: '16px',
    color: '#32325d',
  }
};

let card = elements.create('card', {
  style: style,
  hidePostalCode: true,
});

card.mount('#card-element');

card.addEventListener('change', function(event) {
  let displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

let form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  envoyerMail();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      let errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  let form = document.getElementById('payment-form');
  let hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

function envoyerMail() {
  (function() {
    emailjs.init("ixOrs32Cy-jH_Xqoi");
  })();

  let nom = document.querySelector("#Nom").value;
  let prenom = document.querySelector("#Prénom").value;
  let email = document.querySelector("#Email").value;
  let numero = document.querySelector("#numero").value;
  let adresse = document.querySelector("#Adresse").value;
  let codePostale = document.querySelector("#CodePostale").value;
  let prixTotal = document.querySelector("#prixTotal").textContent;

  // Récupérer les valeurs des articles
  let recapArticles = "";
  document.querySelectorAll("#recap-articles p").forEach(function(article, index) {
    let pack = article.id.replace(/\[\d+\] /g, '').replace(/\[\d+\] x?/g, "").trim();
    if (pack.startsWith('x')) {
      pack = pack.replace('x', '').trim();
    }
    let selectFormat = article.querySelector("select[data-key='" + pack + "-A5-Format']");
    let selectPlastifie = article.querySelector("select[data-key='" + pack + "-A5-Plastifie']");
    if (selectFormat && selectPlastifie) {
      let quantite = selectFormat.getAttribute('data-quantite');
      let format = selectFormat.getAttribute('data-format');
      let plastifie = selectPlastifie.getAttribute('data-plastifie');
      recapArticles += quantite + " x " + pack + " Format: " + format + " Plastifié: " + plastifie + "\n";
    }
  });

  let message = `
Vente de ${nom} ${prenom},

Récapitulatif des articles :
${recapArticles}

Prix de la précommande
${prixTotal}
Adresse de contact du client : ${email}
Numéro de téléphone : ${numero}
Adresse : ${adresse}, ${codePostale}
`;

  let parms = {
    sendername: nom,
    replyto: email,
    message: message
  };

  let serviceID = "service_b1jfzdk";
  let templateID = "template_qcjv2ql";

  emailjs.send(serviceID, templateID, parms)
    .then(res => {
      alert("Précommande envoyé !\n La nous vous recontacteront sous 3 jours \n (envoi de la commande en moins d'une semaine)");
    })
    .catch(error => {
      alert("Une erreur est survenu lors de l'envoi du mail de la précommande,\n Veuillez nous excuser, si le paiement a bien été confirmé, veuillez nous contacter pour confirmer la commande. \n > Page Contact > :", error);
    });
}
