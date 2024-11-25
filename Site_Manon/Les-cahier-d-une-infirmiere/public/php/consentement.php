<!DOCTYPE html>
<html lang="fr">


<div id="cookie-consent-popup" class="cookie-banner">
    <h2>Consentement aux cookies</h2>
    <div class="nav-buttons">
        <button onclick="showTab('consent-tab')">Consentement</button>
        <button onclick="showTab('details-tab')">Plus de détails</button>
        <button onclick="showTab('about-tab')">À propos</button>
    </div>
    <div id="consent-tab" class="tab active">
        <p>Ce site utilise des cookies.</p>
        <p>Nous utilisons des cookies pour activer les fonctionnalités de paiement en ligne (via Stripe) et d'envoi
            d'e-mails (via EmailJS). En l'absence de commande, seuls ces cookies seront enregistrés. En cas de commande,
            celle-ci est conservée dans la boîte mail et automatiquement supprimée après un délai d'un an.</p>
        <div class="toggle-container">
            <div class="toggle">
                <span>Nécessaires</span>
                <input type="checkbox" id="necessary" checked disabled>
                <label for="necessary"></label>
            </div>
            <div class="toggle">
                <span>Préférences</span>
                <input type="checkbox" id="preferences">
                <label for="preferences"></label>
            </div>
        </div>
        <div class="buttons">
            <button onclick="allowSelection()">Autoriser la sélection</button>
            <button onclick="allowAll()">Tout autoriser</button>
        </div>
    </div>
    <div id="details-tab" class="tab">
        <h3>Détails</h3>
        <div class="cookie-list">
            <div class="cookie-category">
                <h3>Cookies nécessaires</h3>
                <div class="toggle">
                    <span>Nécessaires</span>
                    <input type="checkbox" id="necessary" checked disabled>
                    <label for="necessary"></label>
                </div>
                <p>Les cookies nécessaires permettent de rendre un site web utilisable en activant des fonctions de base d'un site de vente
                    comme la sécuritées du site permettant de payer en toute sécurité. Le site ne peut pas
                    fonctionner correctement sans ces cookies.</p>
                <div class="provider" onclick="toggleProvider(this)">
                    <div class="provider-header">
                        <span>les-cahiers-d-une-infirmiere.onrender.com (1)</span>
                        <span><a href="https://les-cahiers-d-une-infirmiere.onrender.com/php/conditions&mentions.php"
                                target="_blank">En savoir plus sur ce fournisseur</a></span>
                        <span class="toggle-icon">+</span>
                    </div>
                    <div class="provider-content">
                        <div class="cookie-item">
                            <strong>CookieConsent</strong>
                            Stocke l'état du consentement aux cookies de l'utilisateur pour le domaine actuel
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> 1 an</small>
                            <small><strong>Type :</strong> Cookie HTTP</small>
                        </div>
                        <div class="cookie-item">
                            <strong>__stripe_sid</strong>
                            Ce cookie est nécessaire pour effectuer des transactions par carte de crédit sur le site
                            web. Le service est fourni par Stripe.com, qui permet des transactions en ligne sans stocker
                            d'informations sur les cartes de crédit.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> 1 jour</small>
                            <small><strong>Type :</strong> Cookie HTTP</small>
                        </div>
                        <div class="cookie-item">
                            <strong>m</strong>
                            Détermine l'appareil utilisé pour accéder au site web. Cela permet au site d'être formaté en
                            conséquence.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> 400 jours</small>
                            <small><strong>Type :</strong> Cookie HTTP</small>
                        </div>
                    </div>
                </div>
                <div class="provider" onclick="toggleProvider(this)">
                    <div class="provider-header">
                        <span>Stripe (6)</span>
                        <span><a href="https://stripe.com/fr/privacy" target="_blank">En savoir plus sur ce
                                fournisseur</a></span>
                        <span class="toggle-icon">+</span>
                    </div>
                    <div class="provider-content">
                        <div class="cookie-item">
                            <strong>__stripe_mid</strong>
                            Ce cookie est nécessaire pour effectuer des transactions par carte de crédit sur le site
                            web. Le service est fourni par Stripe.com, qui permet des transactions en ligne sans stocker
                            d'informations sur les cartes de crédit.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> 1 an</small>
                            <small><strong>Type :</strong> Cookie HTTP</small>
                        </div>
                        <div class="cookie-item">
                            <strong>_ab</strong>
                            Ce cookie est utilisé en lien avec la fenêtre de paiement. Ce cookie est nécessaire pour
                            effectuer des transactions sécurisées sur le site.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> Session</small>
                            <small><strong>Type :</strong> Stockage local HTML</small>
                        </div>
                        <div class="cookie-item">
                            <strong>id</strong>
                            En attente
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> Session</small>
                            <small><strong>Type :</strong> Stockage local HTML</small>
                        </div>
                    </div>
                </div>
                <div class="provider" onclick="toggleProvider(this)">
                    <div class="provider-header">
                        <span>api2.hcaptcha.com (1)</span>
                        <span><a href="https://www.hcaptcha.com/" target="_blank">En savoir plus sur ce
                                fournisseur</a></span>
                        <span class="toggle-icon">+</span>
                    </div>
                    <div class="provider-content">
                        <div class="cookie-item">
                            <strong>__cflb</strong>
                            Enregistre quel cluster de serveurs sert le visiteur. Cela est utilisé dans le cadre de
                            l'équilibrage de charge pour optimiser l'expérience utilisateur.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> 1 jour</small>
                            <small><strong>Type :</strong> Cookie HTTP</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cookie-category">
                <h3>Préférences</h3>
                <div class="toggle">
                    <span>Préférences</span>
                    <input type="checkbox" id="preferences">
                    <label for="preferences"></label>
                </div>
                <p>Les cookies de préférences permettent à un site web de se souvenir des informations qui modifient la
                    manière dont le site se comporte ou apparaît, comme votre langue préférée ou la région où vous vous
                    trouvez.</p>
                <div class="provider" onclick="toggleProvider(this)">
                    <div class="provider-header">
                        <span>Stripe (1)</span>
                        <span><a href="https://stripe.com/fr/privacy" target="_blank">En savoir plus sur ce
                                fournisseur</a></span>
                        <span class="toggle-icon">+</span>
                    </div>
                    <div class="provider-content">
                        <div class="cookie-item">
                            <strong>1</strong>
                            Ce cookie est utilisé en lien avec la fenêtre de paiement. Ce cookie est nécessaire pour
                            effectuer des transactions sécurisées sur le site.
                            <br>
                            <small><strong>Durée maximale de stockage :</strong> Session</small>
                            <small><strong>Type :</strong> Stockage local HTML</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button onclick="allowSelection()">Autoriser la sélection</button>
                <button onclick="allowAll()">Tout autoriser</button>
            </div>
        </div>
    </div>
    <div id="about-tab" class="tab">
        <h3>À propos</h3>
        <p>Les cookies sont de petits fichiers texte qui peuvent être utilisés par les sites web pour rendre
            l'expérience d'un utilisateur plus efficace.</p>
        <p>Le RGPD stipule que nous pouvons stocker des cookies sur votre appareil s'ils sont strictement nécessaires au
            fonctionnement de ce site. Pour tous les autres types de cookies, nous avons besoin de votre permission.</p>
    </div>
</div>

<script>
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
</script>
</body>

</html>