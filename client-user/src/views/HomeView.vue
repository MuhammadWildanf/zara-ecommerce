<script>
import CardComponent from "../components/CardComponent.vue";
import { mapActions, mapState } from "pinia";
import { useAppStore } from "../stores/counter";

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      selectedCategory: "",
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(useAppStore, ["products", "categories", "totalPages"]),

    filteredProducts() {
      if (this.selectedCategory === "") {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.categoryId === this.selectedCategory
        );
      }
    },
  },
  methods: {
    ...mapActions(useAppStore, ["fetchProduct", "fetchCategory"]),
    filterProducts() {
      this.fetchProduct({
        filter: { category: this.selectedCategory },
        page: 1,
      });
      this.currentPage = 1;
    },
    loadPage(direction) {
      if (direction === "prev" && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === "next" && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      this.fetchProduct({
        filter: { category: this.selectedCategory },
        page: this.currentPage,
      });
    },
  },
  created() {
    this.fetchProduct({ page: 1 });
    this.fetchCategory();
  },
};
</script>

<template>
  <section id="hero" class="pt-10">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="w-full self-center px-4 lg:w-1/2">
          <h1 class="text-base font-semibold text-primary md:text-xl">
            Welcome To Willdone CLoth 🤞
            <span class="block font-bold text-dark text-4xl mt-1 lg:text-5xl"
              >Temukan gaya Anda</span
            >
          </h1>
          <h2 class="font-medium text-slate-500 text-lg mb-5 lg:text-2xl">
            Bersiaplah untuk Tampil Memukau
            <span class="text-dark">Gaya Terkini, Kualitas Terbaik </span>
            <p class="font-medium text-slate-400 mb-10 leading-relaxed">
              Hanya di Wildone Cloth
            </p>
          </h2>
          <a
            href=""
            class="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full hover:shadow-lg hover:bg-teal-400"
            >Mulai Sekarang</a
          >
        </div>
        <div class="w-full self-end px-4 lg:w-1/2">
          <div class="relative mt-10 lg:mt-9 lg:right-0">
            <img
              src="../assets/img/home.png"
              alt=""
              class="max-w-full mx-auto"
            />
            <span
              class="absolute bottom-0 -z-10 left-1/2 -translate-x-1/2 md:scale-125"
            >
              <svg
                width="400"
                height="400"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#14b8a6"
                  d="M63.2,-18.3C72.4,8,64,42.3,43.9,55.8C23.8,69.4,-8.1,62.2,-27.9,46C-47.6,29.9,-55.2,4.7,-48.6,-18C-41.9,-40.6,-21,-60.8,3,-61.8C27,-62.8,53.9,-44.5,63.2,-18.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="product" class="pt-10 pb-32">
    <div class="container">
      <span
        class="block font-bold text-dark text-center text-4xl mt-10 lg:text-5xl"
        >Our Products</span
      >
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory" @change="filterProducts">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div class="flex flex-wrap">
        <div
          class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5"
        >
          <CardComponent
            v-for="product in filteredProducts"
            key="product.id"
            :product="product"
          />
        </div>
      </div>
      <!-- Pagination controls -->
      <div class="text-center mt-4">
        <button
          @click="loadPage('prev')"
          :disabled="currentPage === 1"
          class="px-4 py-2 mr-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <button
          @click="loadPage('next')"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>
