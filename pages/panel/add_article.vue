<template>
    <div class="admin-page container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Panel d'administration</h1>
  
      <div v-if="$auth.loggedIn">
        <p class="mb-4">Bienvenue, {{ $auth.user.name }} !</p>
  
        <button @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Déconnexion
        </button>
      </div>
  
      <div v-else>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button @click="login"
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Se connecter avec Google
        </button>
      </div>
  
      <div v-if="message" :class="['mt-4 p-4 rounded', messageClass]">
        {{ message }}
      </div>
  
      <div class="flex justify-center">
      <form @submit.prevent="addBlogArticle" class="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <div class="mb-4">
          <label for="blogTitle" class="block text-sm font-medium text-gray-700">Titre de l'article</label>
          <input type="text" id="blogTitle" v-model="newBlogArticle.title" placeholder="Entrez le titre de l'article"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mb-4">
          <label for="blogContent" class="block text-sm font-medium text-gray-700">Contenu de l'article</label>
          <textarea id="blogContent" v-model="newBlogArticle.content" placeholder="Entrez le contenu de l'article"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div class="mb-4">
          <label for="blogImageInput" class="block text-sm font-medium text-gray-700">Upload image</label>
          <input type="file" id="blogImageInput" ref="imageLocalInput" accept="image/*"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Ajouter l'article
        </button>
      </form>
    </div>
  
    </div>
  </template>
  
  <script>
  export default {
    layout: 'panel',
    auth: true,
  
  
    data() {
      return {
        message: '',
        messageClass: '',
        newBlogArticle: {
          title: '',
          content: '',
          image: '',
        }
      }
    },
  
    methods: {
  
      async addBlogArticle() {
        const formData = new FormData()
        formData.append('title', this.newBlogArticle.title)
        formData.append('content', this.newBlogArticle.content)
        formData.append('image', this.$refs.imageLocalInput.files[0])
        try {
          const response = await this.$axios.post('/api/blog/add', formData);
          console.log('L\'article a été ajouté avec succès:', response.data);
          this.newBlogArticle = { title: '', content: '', image: '' }; 
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'article:', error);
        }
      },
  
      showMessage(msg, type) {
        this.message = msg
        this.messageClass = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        setTimeout(() => {
          this.message = ''
          this.messageClass = ''
        }, 3000)
      },
  
      login() {
        this.$auth.loginWith('authentik')
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