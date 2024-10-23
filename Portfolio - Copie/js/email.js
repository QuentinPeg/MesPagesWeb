function copyEmail() {
    // Créer un élément de texte temporaire
    var tempElement = document.createElement("textarea");
    // Définir la valeur de l'élément à l'adresse e-mail
    tempElement.value = "quentin.peguin@etu.univ-grenoble-alpes.fr";
    // Ajouter l'élément au corps du document
    document.body.appendChild(tempElement);
    // Sélectionner le texte dans l'élément temporaire
    tempElement.select();
    // Copier le texte sélectionné dans le presse-papiers
    document.execCommand("copy");
    // Supprimer l'élément temporaire du document
    document.body.removeChild(tempElement);
    // Afficher une alerte pour confirmer la copie
    alert("Adresse e-mail copiée !");
}