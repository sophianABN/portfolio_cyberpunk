<template>
  <div class="panel-layout">
    <!-- Header avec menu burger pour les petits écrans -->
    <div class="md:hidden bg-black text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Panel ADMIN</h1>
      <button @click="toggleSidebar" class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <div :class="[
      'sidebar bg-black text-white w-64 fixed h-full left-0 top-0 p-4 transition-transform duration-300 ease-in-out',
      'md:translate-x-0',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <h1 class="text-xl font-bold mb-6 hidden md:block">Panel ADMIN</h1>
      <nav>
        <ul>
          <li class="mb-2">
            <NuxtLink 
              to="/panel" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              :class="{ 'text-yellow-300': $route.path === '/panel' }"
              @click="closeSidebarOnMobile"
            >
              Dashboard
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink 
              to="/panel/manage_articles" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              :class="{ 'text-yellow-300': $route.path.startsWith('/panel/manage_articles') }"
              @click="closeSidebarOnMobile"
            >
              Gestion Articles
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink 
              to="/panel/add_article" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              :class="{ 'text-yellow-300': $route.path.startsWith('/panel/add_article') }"
              @click="closeSidebarOnMobile"
            >
              Ajouter Article
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink 
              to="/panel/add_ai_art" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              :class="{ 'text-yellow-300': $route.path.startsWith('/panel/add_ai_art') }"
              @click="closeSidebarOnMobile"
            >
              AI_Art
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink 
              to="/" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              @click="closeSidebarOnMobile"
            >
              Retour au site
            </NuxtLink>
          </li>
          <li class="mb-2">
            <a 
              href="#" 
              class="block py-2 px-4 rounded transition-colors duration-200 hover:text-yellow-300"
              @click.prevent="logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main content -->
    <div class="panel-content md:ml-64 min-h-screen bg-yellow-300 p-8">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelLayout',
  data() {
    return {
      isSidebarOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    closeSidebarOnMobile() {
      if (window.innerWidth < 768) {
        this.isSidebarOpen = false
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    }
  }
}
</script>

<style scoped>
.panel-layout {
  min-height: 100vh;
}
</style>
