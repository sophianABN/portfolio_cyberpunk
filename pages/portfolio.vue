<template>
    <div class="container mx-auto p-4 md:p-8">
      <h1 class="cyber-h text-3xl md:text-4xl lg:text-5xl mb-6">Ai Bears</h1>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2">
          <div class="cyber-tile-big fg-white bg-cyan">
            <img src="/img/cyberbear.jpeg" class="w-full h-auto object-cover" alt="Image du projet">
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <h3 class="cyber-h text-xl md:text-2xl lg:text-3xl mb-2">Description du projet</h3>
          <p class="oxanium-font mb-4 text-base md:text-lg lg:text-xl">Imaginez une intelligence artificielle capable de distinguer les ours sauvages des grizzlys et même des adorables ours en peluche, grâce aux bibliothèques Fastai et PyTorch. Cette technologie ingénieuse n'est pas seulement fascinante, mais aussi incroyablement utile.</p>
          <h3 class="cyber-h text-xl md:text-2xl lg:text-3xl mb-2">Tester le projet</h3>
          <label class="cyber-button-small inline-block mb-4 md:mb-2" for="inputTag">
            <span v-if="selectedFile">{{ selectedFile.name }}</span>
            <span v-else>Sélectionner une image</span>
            <input id="inputTag" style="display:none" type="file" ref="fileInput" accept="image/png, image/jpeg" @change="handleFileUpload">
          </label>
          <button class="cyber-button-small bg-purple fg-white md:ml-4" @click="uploadFile">
            Envoyer <span class="glitchtext">Envoyer</span>
            <span class="tag">R25</span>
          </button>
          <div v-if="result[0]" class="mt-4">
            {{ result[0] }} {{ result[1] * 100 }}%
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios'


export default {
  auth: false,

    data() {
        return {
            selectedFile: null,
            result: []
        };
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadFile() {
            const formData = new FormData();
            this.result = [];
            formData.append('file', this.selectedFile);
            try {
                let result = await axios.post('/apibear/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.result = result.data
                console.log('Fichier envoyé avec succès');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du fichier', error);
            }
        }
    }
};
</script>
