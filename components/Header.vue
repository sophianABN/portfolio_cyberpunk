<template>
  <div id="header" class="bg-black fg-white cyber-razor-bottom pt-0 pb-4">
    <span class="cyberpunk-font-og f-x2-5">
      <span class="c">L</span>AKHTISTE
    </span>
    <span id="header-css" class="fg-yellow f-x3-5 pb-2" style="position: relative; top: 10px;">
      METAVENGERS<span class="cyber-glitch-3">_</span>
    </span>

    <div class="block md:hidden" @click="toggleMenu">
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </div>

    <nav :class="{ hidden: !menuOpen, 'block': menuOpen, 'md:flex': true }">
      <ul class="flex flex-col md:flex-row">
        <li><nuxt-link to="/">Accueil</nuxt-link></li>
        <li><nuxt-link to="/portfolio">Portfolio</nuxt-link></li>
        <li><nuxt-link to="/ai_art">AI_Art</nuxt-link></li>
        <li><nuxt-link to="/metavengers">Metavengers</nuxt-link></li>
        <li><nuxt-link to="/blog">Blog</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin: 10px 0;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: all 0.3s ease;
}

nav ul li a:hover {
  color: yellow;
}

@media (min-width: 768px) {
  nav ul {
    flex-direction: row;
  }

  nav ul li {
    display: inline;
    margin: 0 10px;
  }

  nav ul li a {
    font-size: 18px;
  }
}
</style>
