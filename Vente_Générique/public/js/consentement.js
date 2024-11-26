function toggleProvider(element) {
    element.classList.toggle('active');
    const toggleIcon = element.querySelector('.toggle-icon');
    toggleIcon.textContent = element.classList.contains('active') ? '-' : '+';
}

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function allowAll() {
    document.getElementById('preferences').checked = true;
    saveCookiePreferences();
}

function allowSelection() {
    saveCookiePreferences();
}

function saveCookiePreferences() {
    const preferences = document.getElementById('preferences').checked; // Vérifie l'état du bouton bascule
    document.cookie = `preferences=${preferences}; path=/; max-age=${60 * 60 * 24 * 365}; Secure; SameSite=Strict`; // Crée le cookie avec sécurité renforcée
    console.log('Cookie preferences saved'); // Message de confirmation
    location.reload();
}


window.onload = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value === 'true';
        return acc;
    }, {});

    if (cookies.preferences !== undefined) {
        document.getElementById('preferences').checked = cookies.preferences;
    }
}
