// Attendre que le contenu de la page soit chargé
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner la div à supprimer en utilisant un sélecteur CSS
    var divASupprimer = document.querySelector('div[style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"]');

    // Vérifier si la div existe
    if (divASupprimer) {
        // Supprimer la div
        divASupprimer.parentNode.removeChild(divASupprimer);
    } else {
        console.log("La div spécifiée n'existe pas.");
    }
});