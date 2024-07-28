<template>
  
  </template>
  
  <script>
  export default {
    auth: false,

    mounted() {
        this.$auth.loginWith('authentik')
    }
   
  }
  </script>