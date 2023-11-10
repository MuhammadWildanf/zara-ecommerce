<script>
import {mapActions} from 'pinia'
import {useAppStore} from '../stores/counter'
export default {
    data() {
    return {
      dataInput: {
        username:"",
        email: "",
        password: "",
        phoneNumber:"",
        address:""

      },
    };
  },
  methods:{
    ...mapActions(useAppStore,['registerHandler'])
  }
};
</script>

<template>
  <section id="register">
    <div class="min-h-screen flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div class="px-5 py-7">
            <form action="" @submit.prevent="registerHandler">
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Username</label
            >
            <input
              type="text"
              v-model="dataInput.username"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >E-mail</label
            >
            <input
              type="text"
              v-model="dataInput.email"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Password</label
            >
            <input
              type="text"
              v-model="dataInput.password"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Phone Number</label
            >
            <input
              type="text"
              v-model="dataInput.phoneNumber"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Address</label
            >
            <input
              type="text"
              v-model="dataInput.address"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="button"
              class="transition duration-200 bg-teal-500 hover:bg-teal-600 focus:bg-teal-700 focus:shadow-sm focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span class="inline-block mr-2">Register</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 inline-block"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            </form>
          </div>
          <div class="py-5">
            <div class="grid grid-cols-2 gap-1">
              <div class="text-center sm:text-left whitespace-nowrap">
                <router-link
                 to="/login"
                  class="btn transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <span class="inline-block ml-1"
                    >Sudah Punya Akun ? Silahkan Login</span
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="py-5">
          <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap">
              <router-link
              to="/"
                class="btn transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span class="inline-block ml-1">Kembali ke Product</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
