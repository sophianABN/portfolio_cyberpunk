<template>
  <div class="cyber-tile bg-cyan fg-black p-4 md:p-6 lg:p-8 rounded-md shadow-md">
    <div class="card-image mb-4">
      <img :src="image" alt="Image du projet" class="w-full h-auto rounded-md">
    </div>
    <div class="card-header mb-4">
      <h3 class="cyber-h pl-2 text-lg md:text-xl lg:text-2xl">{{ title }}</h3>
    </div>
    <div class="card-content pl-2 mb-4 text-sm md:text-base lg:text-lg">
      <p>{{ content }}</p>
    </div>
    <div class="card-footer">
      <a :href="link" class="text-blue-500 pl-2 hover:underline">{{ linkText }}</a>
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
      image: String // Ajoutez la propriété image dans les props
    }
  };
  </script>
  
  