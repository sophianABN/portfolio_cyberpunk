<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="cyber-h text-4xl md:text-5xl lg:text-6xl mb-8">Blog</h1>
    <BlogList />
  </div>
</template>

<script>
import BlogList from '~/components/BlogList.vue'

export default {

  auth: false,
  
  components: {
    BlogList
  }
}
</script>