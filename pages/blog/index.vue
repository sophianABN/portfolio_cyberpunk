<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    <BlogList />
  </div>
</template>

<script>
import BlogList from '~/components/BlogList.vue'

export default {
  components: {
    BlogList
  }
}
</script>