<template>
  <div class="layout-container">
    <Header /> <!-- Composant du header avec la navbar -->
    <div class="main-content">
      <Nuxt /> <!-- C'est ici que le contenu de chaque page sera rendu -->
    </div>
    <Footer /> <!-- Composant du footer -->
  </div>
</template>

<script>
import Header from '~/components/Header.vue'; // Importez votre composant de header
import Footer from '~/components/Footer.vue'; // Importez votre composant de footer

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
