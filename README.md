"# Mon projet Angular + Spring Boot" 

# Mon Projet Angular + Spring Boot (Zone Critique)

Ce projet est une application full-stack développée avec Angular pour le frontend et Spring Boot pour le backend. Il utilise MySQL comme base de données et est déployé avec Docker via docker-compose.

Structure du projet

Frontend : Angular 19.1.5

Backend : Spring Boot 3.4.2 (Java 21)

Base de données : MySQL 8.0

Gestion des conteneurs : Docker et docker-compose

## Structure du projet 

## 🚀 Instalation et exécution 

### 1️⃣ Prérequis

- [Node.js](https://nodejs.org/) (Version 18+)
- [Angular CLI](https://angular.io/cli) (version 19+)
- [Java JDK](https://adoptopenjdk.net/) (Version 21+)
- [Docker](https://www.docker.com/)
- [MySQL](https://dev.mysql.com/downloads/installer/)

### 2️⃣ Cloner le projet 

```sh
git clone https://github.com/AnthoLC77/Zone-Critique.git
cd Zone-Critique

```

### 3️⃣ Lancer le projet avec Docker Compose

```sh
docker-compose up -d --build

```
4️⃣ Accéder à l'application

Frontend Angular : http://localhost:8080

Backend Spring Boot (API) : http://localhost:8081

MySQL (via un outil comme MySQL Workbench) : localhost:3307

6️⃣ Arrêter les conteneurs

Si vous souhaitez arrêter les services, utilisez la commande :

```sh

docker-compose down

```
