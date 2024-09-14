<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blog_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué: " . $conn->connect_error);
}

// Récupérer les données du formulaire
$title = $_POST['title'];
$content = $_POST['content'];
$author = $_POST['author'];

// Préparer et exécuter la requête d'insertion
$sql = "INSERT INTO posts (title, content, author, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $title, $content, $author);

if ($stmt->execute()) {
    // Redirection vers la page des articles après ajout
    header("Location: actus.php");
} else {
    echo "Erreur lors de l'ajout de l'article: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
