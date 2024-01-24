<template>
    <div>
      <h1>{{ welcomeMessage }}</h1>
      <CatViewer @cat-clicked="catClicked" @cat-fetched="catFetched" />
    </div>
  </template>
  
  <script>
  import CatViewer from './CatViewer.vue';
  
  export default {
    components: { CatViewer },
    data() {
      return {
        welcomeMessage: 'Welcome to the Cat Viewer APP',
      };
    },
    methods: {
      catClicked() {
        console.log('Cat clicked event received:');
        this.welcomeMessage = "Thank you for clicking the CAT!"
      },
      catFetched(){
        this.welcomeMessage = 'Welcome to the Cat Viewer APP'
      },
    },
  };
  </script>
  
  <style scoped>
  </style>