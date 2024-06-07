document.addEventListener('DOMContentLoaded', function () {
    function updateTotal() {
        let total=0;
        let total1=0;
        let total2=0;

        if (document.getElementById('Packintégral').checked) {
            total1 += 290; // Montant pour le Pack intégral (à ajuster selon vos besoins)

            // Vérifiez si l'option A6 est sélectionnée pour choixFromat1
            if (document.getElementById('choixFromat1').value === 'option2') {
                total1 = 250; // Ajoute 250 au total si A6 est sélectionné
            }
            // Vérifiez si l'option 'Non' est sélectionnée pour choixPlastifié1
            if (document.getElementById('xd1').value === 'option2') {
                total1 -= 10; // Ajoute 50 au total si 'Non' est sélectionné pour le plastifié
            }   
        }

        if (document.getElementById('PackPremièreAnnée').checked) {
            total2 += 117; // Montant pour le Pack intégral (à ajuster selon vos besoins)

            // Vérifiez si l'option A6 est sélectionnée pour choixFromat1
            if (document.getElementById('choixFromat2').value === 'option2') {
                total2 = 86; // Ajoute 250 au total si A6 est sélectionné
            }
            // Vérifiez si l'option 'Non' est sélectionnée pour choixPlastifié1
            if (document.getElementById('xd2').value === 'option2') {
                total2 -= 10; // Ajoute 50 au total si 'Non' est sélectionné pour le plastifié
            }   
        }

        total=total1+total2


        document.getElementById('total').innerText = 'Total : ' + total + ' €';
    }

    document.getElementById('Packintégral').addEventListener('change', updateTotal);
    document.getElementById('PackPremièreAnnée').addEventListener('change', updateTotal);
    document.getElementById('choixFromat1').addEventListener('change', updateTotal);
    document.getElementById('xd1').addEventListener('change', updateTotal);

    updateTotal();
});