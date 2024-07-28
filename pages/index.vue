<template>
  <div>
    <section id="accueil">
  <h1 class="cyber-h text-4xl md:text-5xl lg:text-6xl">Qui suis-je</h1>
  <div class="image-profil flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mt-6 md:mt-12 lg:mt-16">
    <div class="cyber-tile-big bg-cyan w-full md:w-1/3">
      <img class="w-full h-full object-cover" src="/img/profil.jpeg" alt="Ma Photo de Profil">
    </div>
    <div class="oxanium-font text-base w-full md:w-2/3 md:text-lg lg:text-xl">
      <p>
        Je suis Lakhtiste, un Metavengers passionné par l'intelligence artificielle qui incarne la dualité de notre ère cyberpunk.
      </p>
      <br>
      <p>
        Au fil de votre navigation, vous plongerez dans un univers où l'humanité et la technologie s'entrelacent, où les rêves se matérialisent en lignes de code et où l'art rencontre l'intelligence artificielle. Découvrez bien plus qu'un simple site : une communauté où les esprits curieux et les créateurs audacieux se rejoignent pour explorer les horizons infinis de la technologie. En tant que gardiens du monde virtuel, nous repoussons les limites de l'imaginaire, où chaque ligne de code est une œuvre d'art et chaque algorithme, une poésie en mouvement.
      </p>
      <br>
      <p>
        Les Metavengers ne sont pas juste des passionnés d'IA. Nous sommes des artistes du numérique, des visionnaires qui réécrivent le futur à coups de pixels et de passion. Notre mission ? Préserver l'essence humaine au cœur des avancées technologiques, tout en repoussant les frontières de l'innovation.
      </p>
    </div>
  </div>
</section>



    <section id="projets">
      <h2 class="cyber-h text-4xl md:text-5xl lg:text-6xl">Portfolio</h2>
      <div class="flex flex-wrap gap-6 md:gap-12 lg:gap-20 mt-6 md:mt-12 lg:mt-16">
        <Card title="AI Bears" content="Distinction d'images d'ours" link="/portfolio" linkText="en savoir plus"
          :image="require('@/static/img/cyberbear.jpeg')" />

        <!-- Ajoutez d'autres projets ici -->
      </div>
    </section>
  </div>
</template>

<script>

export default {
  auth: false,

};
</script>

