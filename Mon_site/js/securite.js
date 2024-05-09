let attempts = 0;

        function checkPassword() {
            const enteredPassword = document.getElementById("password").value;
            // Vérifiez ici si le mot de passe est correct
            if (enteredPassword === "Jet'aime") {
                document.getElementById("passwordForm").style.display = "none";
                document.getElementById("lockedContent").style.display = "block";
            } else {
                attempts++;
                if (attempts >= 3) {
                    document.getElementById("passwordForm").style.display = "none";
                    alert("Trop de tentatives infructueuses. Veuillez réessayer plus tard.");
                } else {
                    alert("Mot de passe incorrect ! Tentative " + attempts + "/3");
                }
            }
        }

        // Empêche la soumission du formulaire lors de l'appui sur la touche "Entrée"
        document.getElementById("passwordForm").addEventListener("submit", function (event) {
            event.preventDefault();
        });