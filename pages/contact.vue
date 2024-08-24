<template>
    <div>
        <section id="contact">
            <h2 class="cyber-h">Contactez-moi</h2>
            <p class="oxanium-font" style="font-size: 20px">N'hésitez pas à me contacter pour toute question ou
                collaboration :</p>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <div class="cyber-h"><label for="name">Nom :</label></div>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                    <div class="cyber-h"><label for="e-mail">Mail :</label></div>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <div class="cyber-h"><label for="message">Message :</label></div>

                    <textarea id="message" v-model="message" required></textarea>
                </div>
                <div class="form-button">
                    <button class="cyber-button-small bg-purple fg-white" style="margin-left: 20px" type="submit">
                        Envoyer <span class="glitchtext">Envoyer</span>
                        <span class="tag">R25</span>
                    </button>
                </div>
            </form>

            <!-- Réseaux sociaux -->
            <div class="social-section">
                <h3 class="cyber-h">Réseaux sociaux :</h3>
                <p class="oxanium-font" style="font-size: 20px">Restez à jour avec mes dernières activités et projets en me
                    suivant sur les réseaux sociaux :</p>
                <div class="social-icons">
                    <a href="https://www.instagram.com/lakhtiste_ai" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://x.com/Lakhtiste_ai" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://discord.gg/Pmx8QssjMY" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-discord"></i>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css'; // Importez les styles de Font Awesome
import axios from 'axios'

export default {
    auth: false,
    data() {
        return {
            name: '',
            email: '',
            message: ''
        };
    },
    methods: {
    async submitForm() {
        // Construire le message à envoyer sur Discord
        const formData = {
            name : this.name,
            email : this.email,
            message : this.message
        }
       

    
        try {
            // Envoyez les données au backend
            await axios.post('/api/contact', formData);
            console.log('Message envoyé avec succès au serveur.');
            // Réinitialisez les champs après avoir soumis le formulaire
            this.name = '';
            this.email = '';
            this.message = '';
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message au serveur :', error);
        }
    }
}

};
</script>
  
<style scoped>
#contact {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
    font-size: 30px;
}

form input,
form textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 5px;
}

.form-button {
    text-align: center;
}

.social-section {
    margin-top: 40px;
}

.social-icons {
    display: flex;
    justify-content: center;
    /* Centrez les éléments horizontalement */
}

.social-icons a {
    margin: 0 15px;
    /* Espace entre les icônes */
    font-size: 24px;
    color: black;
    /* Couleur des icônes en noir */
    text-decoration: none;
}
</style>
  