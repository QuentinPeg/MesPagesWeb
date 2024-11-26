// Gestion des cookies
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function deleteCookie() {
    document.cookie = 'preferences=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict';
    showCookieBanner(); // Réaffiche la bannière
}

function showCookieBanner() {
    // Affiche la bannière de consentement
    document.getElementById('cookie-consent-popup').style.display = 'block';
    document.body.classList.add('body-no-scroll');

    // Remonte en haut de la page
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Défilement fluide
    });
}


function hideCookieBanner() {
    document.getElementById('cookie-consent-popup').style.display = 'none';
    document.body.classList.remove('body-no-scroll');
}

window.onload = function () {
    let preferences = getCookie('preferences');
    if (!preferences) {
        showCookieBanner();
    } else {
        hideCookieBanner();
    }
};
