# Utiliser l'image de base PHP
FROM php:8.3-cli

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    git \
    unzip

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances de Composer
RUN composer install --no-dev --optimize-autoloader

# Exposer le port 8000 pour le serveur
EXPOSE 8000

# Commande pour démarrer le serveur PHP
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
