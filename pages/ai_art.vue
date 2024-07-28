<template>
  <div class="ai-art">
    <h1 class="cyber-h text-4xl md:text-5xl lg:text-6xl mb-8">AI Art Creations</h1>
    <div class="my-4">
      <p class="oxanium-font text-base w-full md:w-2/3 md:text-lg lg:text-xl mx-auto text-center mb-8">
        Explore my AI-generated images and videos.
      </p>
    </div>
    <div class="feed">
      <div v-for="item in sortedItems" :key="item._id" class="feed-item">
        <div v-if="item.type === 'image'" class="image-container">
          <div class="cyberpunk-tile-big fg-dark bg-cyan"></div>
          <img :src="item.url" :alt="item.title" class="w-full h-auto object-cover" />
        </div>
        <div v-else-if="item.type === 'video'" class="video-container">
          <video controls :src="item.url" class="w-full h-auto object-cover"></video>
        </div>
        <div class="item-info bg-cyan p-4">
          <p class="oxanium-font text-base md:text-lg lg:text-xl">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  auth: false,

  data() {
    return {
      images: [],
      videos: [],
      intervalId: null
    }
  },
  computed: {
    sortedItems() {
      return [...this.images.map(img => ({...img, type: 'image'})), 
              ...this.videos.map(vid => ({...vid, type: 'video'}))]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  },
  async fetch() {
    try {
      const [imagesResponse, videosResponse] = await Promise.all([
        axios.get('/api/images'),
        axios.get('/api/videos')
      ])
      this.images = imagesResponse.data
      this.videos = videosResponse.data
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
    }
  },
  fetchOnServer: false,
  methods: {
    async refreshData() {
      await this.$fetch()
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.refreshData()
    }, 60000) // Rafraîchit toutes les minutes
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>
.ai-art {
  @apply max-w-3xl mx-auto px-4;
}
.feed {
  @apply space-y-8;
}
.feed-item {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
.image-container, .video-container {
  @apply w-full h-0 pb-[100%] relative;
}
.image-container img, .video-container video {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}

</style>