<script>
export default {
  props: ["product"],
};
</script>

<template>
  <!--Card 1-->
  <div class="rounded overflow-hidden shadow-lg">
    <img class="h-auto max-w-full" :src="product.imgUrl" />
    <div class="flex items-center justify-between px-4 pt-4">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tabindex="0"
          class="focus:outline-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tabindex="0"
          class="focus:outline-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
        </svg>
      </div>
      <div class="bg-yellow-200 py-1.5 px-6 rounded-full">
        <p tabindex="0" class="focus:outline-none text-xs text-yellow-700">
          {{product.Category.name}}
        </p>
      </div>
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ product.name }}</div>
    </div>
    <div class="px-6 pt-10 pb-5">
      <router-link
        :to="/product/+ product.id"
        class="text-base font-semibold text-white bg-primary py-2 px-8 rounded-full hover:shadow-lg hover:bg-teal-400"
      >
        Detail
      </router-link>
      <button class="btn">
        <p style="display: none">test</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
