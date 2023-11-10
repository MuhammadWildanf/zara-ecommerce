<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "../stores/counter";

export default {
  computed: {
    ...mapState(useAppStore, ["product"]),
  },
  methods: {
    ...mapActions(useAppStore, ["fetchById"]),
  },
  created() {
    this.fetchById(this.$route.params.id);
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="md:flex-1 px-4">
        <div x-data="{ image: 1 }" x-cloak>
          <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
            <div
              x-show="image === 1"
              class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
            >
              <span class="text-5xl">1</span>
            </div>
          </div>
        </div>
        <div class="md:flex-1 px-4">
          <h2
            class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
          >
            Lorem ipsum dolor, sit amet consectetur, adipisicing elit.
          </h2>
          <p class="text-gray-500 text-sm">
            By
            <a href="#" class="text-indigo-600 hover:underline">ABC Company</a>
          </p>

          <div class="flex items-center space-x-4 my-4">
            <div>
              <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                <span class="text-indigo-400 mr-1 mt-1">$</span>
                <span class="font-bold text-indigo-600 text-3xl">25</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-green-500 text-xl font-semibold">Save 12%</p>
              <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
            </div>
          </div>

          <p class="text-gray-500">
            {{product.description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
