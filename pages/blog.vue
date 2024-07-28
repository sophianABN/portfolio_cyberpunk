<template>
    <div class="min-h-screen flex items-center justify-center ">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Page prochainement disponible
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Nous travaillons actuellement sur cette page. Revenez bientôt !
        </p>
        <nuxt-link
          to="/"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Retour à l'accueil
        </nuxt-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    auth: false,

  }
  </script>