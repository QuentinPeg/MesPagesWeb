<?php

// Activer l'affichage des erreurs
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

\Stripe\Stripe::setApiKey($_ENV['SECRET_KEY']);

// Configuration de la clé API Stripe à partir du fichier .env

$response = ["payment" => "error", "amount" => 0];

if (isset($_POST['stripeToken'], $_POST['amount'], $_POST['Nom'], $_POST['Prénom'], $_POST['Email'], $_POST['numero'], $_POST['Adresse'], $_POST['Code_Postale'])) {
    $token = $_POST['stripeToken'];
    $amount = $_POST['amount'];
    $Nom = $_POST['Nom'];
    $Prénom = $_POST['Prénom'];
    $Email = $_POST['Email'];
    $numero = $_POST['numero'];
    $Adresse = $_POST['Adresse'];
    $Code_Postale = $_POST['Code_Postale'];

    $amount = $amount * 100;

   

    try {
        $charge = \Stripe\Charge::create([
            'amount' => $amount,
            'currency' => 'eur',
            'description' => 'Paiement de ' . $Nom . ' ' . $Prénom . ' pour ' . $amount/100 . '€.',
            'source' => $token,
            'metadata' => [
                'Nom' => $Nom,
                'Prénom' => $Prénom,
                'Email' => $Email,
                'numero' => $numero,
                'Adresse' => $Adresse,
                'Code_Postale' => $Code_Postale,
                'Prix de la commande' => $amount / 100 . ' euros',
            ]
        ]);

        $amount = $amount / 100;

        $response = ["payment" => "success", "amount" => $amount];
    } catch (\Stripe\Exception\CardException $e) {
        $response = ["payment" => "error", "amount" => 0, "message" => $e->getMessage()];

        header("Location: paiement_refusee.html");
        exit();

    } catch (\Exception $e) {
        $response = ["payment" => "error", "amount" => 0, "message" => $e->getMessage()];
        header("Location: paiement_refusee.html");
        exit();
    }
}

header("Location: confirmation_paiement.html");
exit();


