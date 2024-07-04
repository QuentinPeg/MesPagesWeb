let stripe = Stripe('pk_test_51OwO5gHzsfwOqlCRpTKi7JTAclf9Ndg4pARKDmuQWcwZgBaTWadxlbMk6GZgTDBRFjCsAI1RK9psGWtajO9ae6tm00zukXQCYC');
let elements = stripe.elements();

let style = {
  base: {
    fontSize: '16px',
    color: '#32325d',
  }
};

let cardNumber = elements.create('cardNumber', {
  style: style,
});
let cardExpiry = elements.create('cardExpiry', {
  style: style,
});
let cardCvc = elements.create('cardCvc', {
  style: style,
});

cardNumber.mount('#card-number-element');
cardExpiry.mount('#card-expiry-element');
cardCvc.mount('#card-cvc-element');

cardNumber.addEventListener('change', function (event) {
  displayError(event);
});
cardExpiry.addEventListener('change', function (event) {
  displayError(event);
});
cardCvc.addEventListener('change', function (event) {
  displayError(event);
});

function displayError(event) {
  let displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
}

let form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  chargerMail();

  stripe.createToken(cardNumber).then(function (result) {
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

let mailData = null;

function chargerMail() {
  let nom = document.querySelector("#Nom").value;
  let prenom = document.querySelector("#Prénom").value;
  let civilité = document.querySelector("#civilite").value;
  let email = document.querySelector("#Email").value;
  let numero = document.querySelector("#numero").value;
  let adresse = document.querySelector("#Adresse").value;
  let codePostale = document.querySelector("#CodePostale").value;
  let ville = document.querySelector('#Ville').value;
  let prixTotal = document.querySelector("#prixTotal").textContent;
  const articles = document.querySelectorAll('#recap-articles > p');
  let recapArticles = "";

  if (civilité == "homme") {
    civilité = "Mr";
  } else if (civilité == "femme") {
    civilité = "Mme";
  }

  articles.forEach(article => {
    let pack = article.id.split('-')[0].trim();
    let selectFormat = article.querySelector(`select[data-nom="${pack}"][data-key$="Format"]`);
    let selectPlastifie = article.querySelector(`select[data-nom="${pack}"][data-key$="Plastifie"]`);

    if (selectFormat && selectPlastifie) {
      let quantite = selectFormat.getAttribute('data-quantite');
      let format = selectFormat.options[selectFormat.selectedIndex].value;
      let plastifie = selectPlastifie.options[selectPlastifie.selectedIndex].value;
      recapArticles += `${quantite} x ${pack} Format: ${format} Plastifié: ${plastifie}\n\n`;
    }
  });
  console.log(recapArticles);

  let message = `
Vente de ${civilité} ${nom} ${prenom},

Récapitulatif des articles :

${recapArticles}

Prix de la précommande
${prixTotal}
Adresse de contact du client : ${email}
Numéro de téléphone : ${numero}
Adresse : ${adresse}, ${codePostale},${ville}
`;

  mailData = {
    sendername: nom,
    replyto: email,
    message: message
  };

  localStorage.setItem('mailData', JSON.stringify(mailData));
}
