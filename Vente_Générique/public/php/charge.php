<?php

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../../vendor/autoload.php';

// Charger les variables d'environnement seulement si le fichier .env existe
if (file_exists(__DIR__ . '/../../.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();
}

// Configuration de la clé API Stripe à partir des variables d'environnement
\Stripe\Stripe::setApiKey($_ENV['SECRET_KEY']);

// Réponse par défaut
$response = ["payment" => "error", "amount" => 0];

// Vérification des données reçues
if (isset($_POST['stripeToken'], $_POST['amount'], $_POST['Nom'], $_POST['Prénom'], $_POST['Email'], $_POST['numero'], $_POST['Adresse'], $_POST['Code_Postale'], $_POST['Ville'])) {
    $token = $_POST['stripeToken'];
    $amount = floatval($_POST['amount']); // Conversion en float pour s'assurer que c'est un nombre
    $Nom = $_POST['Nom'];
    $Prénom = $_POST['Prénom'];
    $Email = $_POST['Email'];
    $numero = $_POST['numero'];
    $Adresse = $_POST['Adresse'];
    $Code_Postale = $_POST['Code_Postale'];
    $Ville = $_POST['Ville'];
    // Conversion du montant en centimes
    $amount = intval($amount * 100);
    
    // Vérification du montant minimum (1 euro)
    if ($amount < 1) {
        $errorMsg = urlencode("Erreur : Le montant n'as pas été pris en compte et apparait comme inférieur à 1.");
        header("Location: paiement_refusee.php?error=$errorMsg");
        exit();
    }

    try {
        // Création du paiement Stripe
        $charge = \Stripe\Charge::create([
            'amount' => $amount,
            'currency' => 'eur',
            'description' => 'Paiement de ' . $Nom . ' ' . $Prénom . ' pour ' . ($amount / 100) . '€.',
            'source' => $token,
            'metadata' => [
                'Nom' => $Nom,
                'Prénom' => $Prénom,
                'Email' => $Email,
                'numero' => $numero,
                'Adresse' => $Adresse,
                'Code_Postale' => $Code_Postale,
                'Ville' => $Ville,
                'Prix de la commande' => ($amount / 100) . ' euros',
            ]
        ]);

        // Paiement réussi
        $response = ["payment" => "success", "amount" => $amount / 100];
        header("Location: confirmation_paiement.php");
        exit();

    } catch (\Stripe\Exception\CardException $e) {
        // Erreur liée à la carte
        $errorMsg = urlencode("Erreur Stripe (Carte) : " . $e->getMessage());
        header("Location: paiement_refusee.php?error=$errorMsg");
        exit();

    } catch (\Stripe\Exception\InvalidRequestException $e) {
        // Erreur de requête Stripe
        $errorMsg = urlencode("Erreur Stripe (Requête invalide) : " . $e->getMessage());
        header("Location: paiement_refusee.php?error=$errorMsg");
        exit();

    } catch (\Exception $e) {
        // Erreur générale
        $errorMsg = urlencode("Erreur Générale : " . $e->getMessage());
        header("Location: paiement_refusee.php?error=$errorMsg");
        exit();
    }
} else {
    // Données manquantes
    $errorMsg = urlencode("Erreur : Données manquantes dans le formulaire.");
    header("Location: paiement_refusee.php?error=$errorMsg");
    exit();
}
