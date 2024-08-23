<template>
  <div class="cyber-tile bg-cyan fg-black p-4 md:p-6 lg:p-8 rounded-md shadow-md flex flex-col h-full">
    <div class="card-image mb-4 flex-shrink-0">
      <img :src="image" alt="Image du projet" class="w-full h-48 object-cover rounded-md">
    </div>
    <div class="card-header mb-2 flex-shrink-0">
      <h3 class="cyber-h pl-2 text-sm md:text-base lg:text-lg font-bold leading-tight">{{ title }}</h3>
    </div>
    <div class="card-content pl-2 mb-4 text-sm md:text-base flex-grow overflow-hidden">
      <p class="line-clamp-3">{{ content }}</p>
    </div>
    <div class="card-footer mt-auto flex justify-between items-center">
      <span class="text-xs pl-2 text-gray-500">{{ date }}</span>
      <div>
  <a :href="link" class="cyber-button-small cyber-button-smaller bg-purple fg-white md:ml-2">
    <span class="glitchtext">Lire la suite</span>{{ linkText }}
  </a>
</div>

     
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
    link: String,
    linkText: String,
    image: String,
    date: String
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.cyber-button-smaller {
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
}
</style>
