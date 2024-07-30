<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles" :key="article._id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
          <p class="text-gray-700 mb-4">{{ truncateContent(article.content, 50) }}</p>
          <p class="text-sm text-gray-500 mb-4">Publié le {{ formatDate(article.createdAt) }}</p>
          <NuxtLink :to="`/blog/${article._id}`" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Lire la suite
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        articles: []
      }
    },
    async fetch() {
      try {
        this.articles = await this.$axios.$get('/api/blog')
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error)
      }
    },
    methods: {
      truncateContent(content, wordCount) {
        const words = content.split(' ')
        if (words.length > wordCount) {
          return words.slice(0, wordCount).join(' ') + '...'
        }
        return content
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
      }
    }
  }
  </script>