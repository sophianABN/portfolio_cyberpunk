<template>
  <div v-if="article" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
    <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
    <img 
      :src="article.image" 
      :alt="article.title" 
      class="w-full max-h-[500px] object-contain mb-4"
    >
    <div v-html="renderedContent" class="prose lg:prose-xl"></div>
    <p class="text-m text-gray-500 mt-4">
      Publié le {{ formatDate(article.createdAt) }} par {{ article.author }}
    </p>
    <p v-if="isUpdated" class="text-m text-gray-500 mt-2">
      Mis à jour le {{ formatDate(article.updatedAt) }}
    </p>
  </div>
</template>

<script>
import showdown from 'showdown';
import axios from 'axios';

export default {
  auth: false,
  fetchOnServer: false,
  
  data() {
    return {
      article: null,
      converter: new showdown.Converter()
    }
  },

  async fetch() {
    let data = await axios.get(`/api/blog/${this.$route.params.id}`)
    this.article = data.data;
  },

  computed: {
    renderedContent() {
      return this.article ? this.converter.makeHtml(this.article.content) : ''
    },
    isUpdated() {
      if (!this.article) return false;
      return new Date(this.article.updatedAt).getTime() > new Date(this.article.createdAt).getTime();
    }
  },

  methods: {
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
  }
}
</script>