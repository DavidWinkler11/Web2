import { defineStore } from 'pinia';

export const useCatStore = defineStore('catStore', {
  state: () => ({
    catId: null,
    catName: '',
  }),
  actions: {
    setCatId(catId) {
      this.catId = catId;
    },
    setCatName(catName) {
      this.catName = catName;
    },
  },
});

export default useCatStore;