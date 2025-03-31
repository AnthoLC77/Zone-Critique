# Utilise l'image officielle de Java (version 21 ici)
FROM openjdk:21-jdk-slim

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier JAR généré dans l'image Docker
COPY target/zoneCritique-0.0.1-SNAPSHOT.jar /app/zoneCritique.jar

# Exposer le port sur lequel l'application Spring Boot écoute (par défaut 8080)
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "zoneCritique.jar"]