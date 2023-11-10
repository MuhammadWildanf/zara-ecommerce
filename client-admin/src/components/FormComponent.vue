<script>
export default {
  name: "FormComponent",

  props: ["dataInput", "categories"],

  data() {
    return {
      formStatus: "new"
    }
  },

  methods: {
    submitForm() {
      if (this.dataInput.id) {
        this.formStatus = "edit"
      }

      this.$emit("handleFormData", this.dataInput, this.formStatus)
      this.dataInput = {}
    }
  },

}
</script>

<template>
  <div class="content-body">
    <div class="container d-flex justify-content-center my-5">
      <div class="card p-3 w-50">
        <h4 class="text-center mb-3">{{ formStatus }} Product</h4>

        <form id="add-form" @submit.prevent="submitForm">

          <label for="form-name" class="form-label">Name</label>
          <input v-model="dataInput.name" id="form-name" type="text" placeholder="input name" class="form-control mb-3">

          <label for="form-category" class="form-label">Category</label>
          <select v-model="dataInput.categoryId" class="form-control mb-3 select-option select-input">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <label for="form-description" class="form-label">Description</label>
          <input v-model="dataInput.description" id="form-description" type="text" placeholder="input description"
            class="form-control mb-3">

          <label for="form-stock" class="form-label">Stock</label>
          <input v-model="dataInput.stock" id="form-stock" type="number" placeholder="input Stock"
            class="form-control mb-3">

          <label for="form-price" class="form-label">Price</label>
          <input v-model="dataInput.price" id="form-price" type="number" placeholder="input price"
            class="form-control mb-3">
            
          <label for="form-status" class="form-label">Status</label>
          <select v-model="dataInput.status" id="product-type" class="form-control form-select" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Archived">Archived</option>
          </select>

          <label for="form-imgUrl" class="form-label">ImageUrl</label>
          <input v-model="dataInput.imgUrl" id="form-imgUrl" type="text" placeholder="input image url"
            class="form-control mb-3">

          <button type="submit" class="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>