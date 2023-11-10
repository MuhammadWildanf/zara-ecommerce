import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    products: [],
    categories: [],
    dataInput: [],
  }),
  getters: {
    totalPages(state) {
      return Math.ceil(state.products.length / state.pageSize);
    },
  },
  actions: {
    async loginHandler(dataInput) {
      try {
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:3000/public/login",
          data: dataInput,
        });
        console.log(data, "<<<");
        localStorage.access_token = data.access_token;
        this.router.push("/");
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async fetchProduct() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:3000/public/products",
          params: {
            filter: { category: this.selectedCategory },
            page: { number: this.currentPage, size: this.pageSize },
          },
        });
        console.log(data, "<<<<<< DATAAAAAAAANYAAAAAAA");
        this.products = data;
      } catch (error) {
        console.log(data);
      }
    },
    async fetchById(id) {
      try {
        let { data } = await axios.get(
          "http://localhost:3000/public/products/" + id
        );
        this.products = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategory() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:3000/categories",
        });
        console.log(data, "<<<<<< DATA CATEGORY");
        this.categories = data;
      } catch (error) {
        console.log(data);
      }
    },
  },
});
