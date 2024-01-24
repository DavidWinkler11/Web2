<template>
    <div>
      <h1>Random Cat Viewer</h1>
      <input v-model="catName" placeholder="Enter Cat Name" />
      <div>
        <p>You entered: {{ catName }}</p>
        <p>Cat Details:</p>
        <ul>
          <li>ID: {{ catId }}</li>
          <li>Name: {{ catName }}</li>
        </ul>
      </div>
      <img :src="catImageUrl" alt="Random Cat" class="cat-image" />
      <button @click="fetchRandomCat">Show Another Cat</button>
  
      <button @click="emitCatClicked">Click the cat</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        catImageUrl: '',
        catId: null,
        catName: '',
      };
    },
    computed: {
      catDetails() {
        return `ID: ${this.catId} Name: ${this.catName}`;
      },
    },
    methods: {
      async fetchRandomCat() {
        this.$emit('cat-fetched');
        try {
          const response = await axios.get('https://api.thecatapi.com/v1/images/search');
          this.catImageUrl = response.data[0].url;
          this.catId = response.data[0].id;
        } catch (error) {
          console.error('Error fetching cat image:', error);
        }
      },
      emitCatClicked() {
        this.$emit('cat-clicked');
      },
    },
    created() {
      console.log('CatViewer component created');
      this.fetchRandomCat();
    },
    watch: {
      catName(newCatName) {
        console.log(`Cat name changed to: ${newCatName}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .cat-image {
    max-width: 100%;
    max-height: 400px;
    cursor: pointer;
  }
  </style>
  