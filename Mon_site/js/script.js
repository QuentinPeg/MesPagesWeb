fetch('../csv/all.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').map(row => row.split(','));
        const header = rows.shift();
        const now = new Date(); // Obtenez la date et l'heure actuelles

        const sortedDates = rows
            .filter(row => row.length === header.length)
            .map(row => {
                const [year, month, day] = row[1].split('-');
                const [hours, minutes] = row[2].split(':');
                return {
                    date: new Date(year, month - 1, day, hours, minutes),
                    confrontation: row[0], // Ajout de la confrontation
                };
            })
            .filter(item => !isNaN(item.date.getTime()) && item.date > now)
            .sort((a, b) => a.date - b.date);

        const prochainsMatchsElement = document.getElementById('prochainsMatchs');
        prochainsMatchsElement.innerHTML = '<h2>Prochains Matchs</h2>';

        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';
        prochainsMatchsElement.appendChild(carouselContainer);

        sortedDates.slice(0, Math.min(sortedDates.length, sortedDates.length)).forEach(item => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const dateString = item.date.toLocaleDateString('fr-FR', options);
            const confrontation = item.confrontation; // Récupération de la confrontation
            const thirtyMinutesBeforeMatch = new Date(item.date.getTime() - 30 * 60000);

            // Création des éléments de paragraphe pour la date et la confrontation
            const dateElement = document.createElement('p');
            dateElement.textContent = dateString;

            const confrontationElement = document.createElement('p');
            confrontationElement.textContent = confrontation;

            // Ajout des éléments de paragraphe à l'élément conteneur
            const containerElement = document.createElement('div');
            containerElement.appendChild(dateElement);
            containerElement.appendChild(confrontationElement);

            containerElement.style.cssText += `
            color: black;
            padding: 10px;
            margin: 10px;
            text-align: center;
            border-radius: 8px;
            `;

            // Vérification du mot et changement de couleur de fond
            const keyword1 = ['LFL'];
            const keyword2 = ['LEC'];
            const keyword3 = ['LCK'];
            const keywords4 = ['KC', 'KCB']; // Modification ici pour gérer plusieurs mots-clés
            const foundKeyword1 = keyword1.some(keyword => confrontation.toLowerCase().includes(keyword.toLowerCase()));
            const foundKeyword2 = keyword2.some(keyword => confrontation.toLowerCase().includes(keyword.toLowerCase()));
            const foundKeyword3 = keyword3.some(keyword => confrontation.toLowerCase().includes(keyword.toLowerCase()));
            const foundKeyword4 = keywords4.some(keyword => confrontation.toLowerCase().includes(keyword.toLowerCase())); // Modification ici

            if ((foundKeyword1 || foundKeyword2)) {
                if (foundKeyword1) {
                    containerElement.style.backgroundColor = 'rgb(241, 239, 89)';
                } else {
                    containerElement.style.backgroundColor = 'rgb(184, 119, 184)';
                }
                if (foundKeyword4) {
                    containerElement.style.fontWeight = 'bold';
                }
                if (now.getTime() >= thirtyMinutesBeforeMatch.getTime()) { notifyUser(confrontation, item.date); }

            } else if (foundKeyword3) {
                containerElement.style.backgroundColor = 'rgb(196, 94, 231)';
                if (foundKeyword4) {
                    containerElement.style.fontWeight = 'bold';
                }
            } else {
                containerElement.style.backgroundColor = 'rgb(175, 224, 224)';
                if (foundKeyword4) {
                    containerElement.style.fontWeight = 'bold';
                }
            }

            carouselContainer.appendChild(containerElement);
        });

        // Initialiser le carrousel
        $('#prochainsMatchs .carousel-container').slick({
            slidesToShow: 3, // Nombre d'éléments à afficher simultanément
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
            nextArrow: '<button type="button" class="slick-next">&gt;</button>',
            infinite: false  // Désactiver le défilement infini
        });

        // Déplacer les boutons dans la section appropriée
        const slickPrevBtn = document.querySelector('#prochainsMatchs .slick-prev');
        const slickNextBtn = document.querySelector('#prochainsMatchs .slick-next');
        prochainsMatchsElement.appendChild(slickPrevBtn);
        prochainsMatchsElement.appendChild(slickNextBtn);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier CSV :', error));

// Vérifiez d'abord si le navigateur supporte les notifications
if (!("Notification" in window)) {
    console.log("Ce navigateur ne supporte pas les notifications de bureau");
} else if (Notification.permission !== "granted") {
    // Sinon, demandez la permission à l'utilisateur
    Notification.requestPermission();
}

function notifyUser(confrontation, matchTime) {
    if (Notification.permission === "granted") {
        const options = { hour: 'numeric', minute: 'numeric' };
        const matchTimeString = matchTime.toLocaleTimeString('fr-FR', options);
        new Notification('Nouveau match à venir !', { body: `Le match "${confrontation}" commence à ${matchTimeString}` });
    }
}
