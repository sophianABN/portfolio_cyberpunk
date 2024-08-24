<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="cyber-h text-4xl md:text-5xl lg:text-6xl mb-8">Gestion des articles</h1>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Titre
            </th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Date de publication
            </th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Date de mise à jour
            </th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in sortedArticles" :key="article._id">
            <td class="py-4 px-6 border-b border-grey-light">{{ article.title }}</td>
            <td class="py-4 px-6 border-b border-grey-light">{{ formatDate(article.createdAt) }}</td>
            <td class="py-4 px-6 border-b border-grey-light">
              {{ article.updatedAt && article.updatedAt !== article.createdAt ? formatDate(article.updatedAt) : '-' }}
            </td>
            <td class="py-4 px-6 border-b border-grey-light">
              <button class="bg-green-500 text-white px-4 py-2 rounded mr-2" @click="editArticle(article._id)">
                Modifier
              </button>
              <button class="bg-red-500 text-white px-4 py-2 rounded" @click="deleteArticle(article._id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'panel',
  auth: true,

  data() {
    return {
      articles: []
    }
  },

  async fetch() {
    try {
      const { data } = await this.$axios.get('/api/blog')
      this.articles = data
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
    }
  },

  computed: {
    sortedArticles() {
      return [...this.articles].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA;
      });
    }
  },

  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString('fr-FR', options)
    },

    editArticle(id) {
      this.$router.push(`/panel/edit-article/${id}`)
    },

    async deleteArticle(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        try {
          await this.$axios.delete(`/api/blog/${id}`)
          this.articles = this.articles.filter(article => article._id !== id)
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'article:', error)
        }
      }
    }
  }
}
</script>