<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <Card 
        v-for="article in articles" 
        :key="article._id"
        :title="article.title"
        :content="truncateContent(article.content, 100)"
        :link="`/blog/${article._id}`"
        :linkText="'Lire la suite'"
        :image="article.image"
        :date="formatDate(article.createdAt)"
        class="w-full max-w-sm"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Card from './Card.vue';

export default {
  components: {
    Card
  },
  fetchOnServer: false,
  data() {
    return {
      articles: []
    }
  },
  async fetch() {
    try {
      let data = await axios.get('/api/blog')
      this.articles = data.data
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
    }
  },
  methods: {
    truncateContent(content, charCount) {
      // Supprimer les balises HTML
      let plainText = content.replace(/<[^>]+>/g, '');
      if (plainText.length > charCount) {
        return plainText.slice(0, charCount) + '...';
      }
      return plainText;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
  }
}
</script>