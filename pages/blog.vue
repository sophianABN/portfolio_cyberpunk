<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Blog</h1>

    <ul v-if="blogArticles.length" class="space-y-8">
      <li v-for="article in blogArticles" :key="article._id" class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">{{ article.title }}</h2>
        <p class="mb-6 text-gray-700">{{ article.content }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
      </li>
    </ul>

    <div v-else class="text-center text-lg font-bold mt-4">
      Aucun article pour le moment...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogArticles: [],
    }
  },
  async created() {
    try {
      const response = await this.$axios.get('/api/blog')
      this.blogArticles = response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('fr-FR', options)
    },
  },
}
</script>
