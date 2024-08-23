<template>
    <div v-if="article" class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
      <img :src="article.image" :alt="article.title" class="w-full h-64 object-cover mb-4">
      <div v-html="renderedContent" class="prose lg:prose-xl"></div>
      <p class="text-sm text-gray-500 mt-4">Publié le {{ formatDate(article.createdAt) }} par {{ article.author }}</p>
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
      }
    },
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('fr-FR', options)
      }
    }
  }
  </script>