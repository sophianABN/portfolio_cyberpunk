# Utilisation d'une image Node.js comme base
FROM node:18-alpine

# Création du répertoire de travail
WORKDIR /app

ARG API_URL

ARG CLIENT_ID

ENV API_URL=$API_URL

ENV CLIENT_ID=$CLIENT_ID

# Copie des fichiers de l'application dans le conteneur
COPY . /app/

# Installation des dépendances
RUN npm install

# Construction de l'application Nuxt.js en mode production
RUN npm run build

# Exposition du port sur lequel l'application Nuxt.js écoute
EXPOSE 3000

# Commande pour démarrer l'application lors du lancement du conteneur
CMD ["npm", "start"]
