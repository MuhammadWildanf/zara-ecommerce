<script>
import axios from 'axios'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import HomeComponent from './components/HomeComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import ProductComponent from './components/ProductComponent.vue'
import CategoryComponent from './components/CategoryComponent.vue'
import LogComponent from './components/LogComponent.vue'
import FormComponent from './components/FormComponent.vue'

// const url = 'https://admin.wildone.my.id'

export default {
  components: {
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProductComponent,
    CategoryComponent,
    LogComponent,
    FormComponent
  },
  data() {
    return {
      currentPage: '',
      products: [],
      dataInput: {},
      categories: [],
      histories: []
    }
  },
  created() {
    if (localStorage.access_token) {
      this.currentPage = 'home'
      this.fetchProduct()
      this.fetchCategory()
      this.fetchHisory()
    } else {
      this.currentPage = 'login'
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      if (page === 'home') {
        this.fetchProduct()
        this.fetchCategory()
        this.fetchHisory()
        // } else if (page === "product") {
        //   this.fetchProduct()
        // } else if (page === "category") {
        //   this.fetchCategory()
        // } else if (page === "log") {
        //   this.fetchHisory()
      } else if (page === 'form') {
        this.dataInput = {
          name: '',
          categoryId: '',
          description: '',
          stock: '',
          price: '',
          status: '',
          imgUrl: ''
        }
      }
    },
    async googleLogin(googleToken) {
      try {
        const {data} = await axios({
          url: `http://localhost:3000/login/google`,
          method: 'POST',
          headers: {
            google_token: googleToken
          }
        })
        
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        this.username = localStorage.username
        localStorage.setItem('role', data.role)
        Toastify({text: `Welcome ${localStorage.username} (${localStorage.role})`, duration: 2000}).showToast();
        this.currentPage = 'home'
      } catch (error) {
        console.log(error)
        Toastify({text: error.response.data.message, duration: 3000, style: { background: "red" }}).showToast();
      }
    },
    async loginHandler(login) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `http://localhost:3000/login`,
          data: login
        })
        console.log(data, '<<<<<<<< test')
        localStorage.access_token = data.access_token
        localStorage.username = data.username
        localStorage.email = data.email
        localStorage.userid = data.id

        this.currentPage = 'home'
        Toastify({text: `Welcome ${data.username} (${data.role})`, duration: 3000}).showToast();
        this.products()
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000, style: { background: "red" }}).showToast();

      }
    },
    async RegisterHandler(register) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `http://localhost:3000/register`,
          data: register
        })
        console.log(data)
        this.currentPage = 'login'
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000, style: { background: "red" }}).showToast();
      }
    },
    async fetchProduct() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/products`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.products = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000}).showToast();
      }
    },
    async fetchCategory() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/categories`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.categories = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000}).showToast();

      }
    },
    async fetchHisory() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/histories`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.histories = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000}).showToast();

      }
    },
    async handleFormData(form, status) {
      try {
        if (status === 'edit') {
          const data = await axios({
            url: `http://localhost:3000/products/${form.id}`,
            method: 'PUT',
            headers: {
              access_token: localStorage.access_token
            },
            data: form
          })
          console.log(data)
          Toastify({text: `Product ${data.name} updated`, duration: 3000}).showToast();
          this.currentPage = 'product'
          this.fetchProduct()
        } else {
          const data = await axios({
            method: 'POST',
            url: `${url}/products`,
            data: form,
            headers: {
              access_token: localStorage.access_token
            }
          })
          console.log(data)
          Toastify({text: `Product ${data.name} added`, duration: 3000}).showToast();
        }
        this.currentPage = 'product'
        this.fetchProduct()
      } catch (error) {
        console.log(error)
        Toastify({text: error.response.data.message, duration: 3000}).showToast();
      }
    },
    async logoutHandler() {
      localStorage.clear()
      this.currentPage = 'login'
    },
    async getProductById(data) {
      const { id } = data
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/products/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.dataInput = data
        this.currentPage = 'form'
      } catch (error) {
        console.log(error)
      }
    },
    async setStatus(data) {
      const { id, status } = data
      try {
        const { data } = await axios({
          url: `http://localhost:3000/products/${id}/${status}`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data, 'ini status yg di ganti')
        Toastify({text: `Product ${data.name}  Status updated`, duration: 3000}).showToast();
        this.fetchProduct()
      } catch (error) {
        console.log(error.response.data)
        Toastify({text: error.response.data.message, duration: 3000, style: { background: "red" }}).showToast();
        this.fetchProduct()
      }
    }
  }
}
</script>

<template>
  <NavbarComponent
    v-if="currentPage !== 'login' && currentPage !== 'register'"
    :currentPage="currentPage"
    
  />

  <SidebarComponent
    v-if="currentPage !== 'login' && currentPage !== 'register'"
    :currentPage="currentPage"
    @changePage="changePage"
    @doLogout="logoutHandler"
  />

  <LoginComponent
    v-if="currentPage === 'login'"
    @doLogin="loginHandler"
    @changePage="changePage"
    @googleLogin="googleLogin"
  />

  <RegisterComponent
    v-if="currentPage === 'register'"
    @doRegister="RegisterHandler"
    @changePage="changePage"
  />

  <HomeComponent
    v-if="currentPage === 'home'"
    @changePage="changePage"
    :products="products"
    :categories="categories"
  />

  <ProductComponent
    v-if="currentPage === 'product'"
    @changePage="changePage"
    :products="products"
    @setStatus="setStatus"
    @getProductById="getProductById"
  />

  <CategoryComponent
    v-if="currentPage === 'category'"
    @changePage="changePage"
    :categories="categories"
  />

  <LogComponent v-if="currentPage === 'log'" @changePage="changePage" :histories="histories" />

  <FormComponent
    v-if="currentPage === 'form'"
    :dataInput="dataInput"
    :categories="categories"
    @handleFormData="handleFormData"
  />
</template>
