const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require ('axios')


const dotenv = require('dotenv');

const imagesRoute = require('./routes/image');
const videosRoute = require('./routes/video');

dotenv.config();

const app = express();
app.use(bodyParser.json());



// Connexion à MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


  // Routes pour les images et vidéos
  app.use('/images', imagesRoute);
  app.use('/videos', videosRoute);
  

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const discordMessage = `Nouveau message de contact :
    Nom : ${name}
    Email : ${email}
    Message : ${message}`;

    const webhookUrl = process.env.WEBHOOK_URL;  // Remplacez par l'URL réelle de votre Webhook Discord

    try {
        // Envoyez le message à Discord en passant par le backend
        await axios.post(webhookUrl, {
            content: discordMessage
        });

        console.log('Message envoyé avec succès à Discord.');
        res.status(200).send('Message envoyé avec succès à Discord.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message à Discord :', error);
        res.status(500).send('Erreur lors de l\'envoi du message à Discord.');
    }
});



module.exports = app;