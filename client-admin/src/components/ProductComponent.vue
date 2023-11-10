<script>
import TableProductComponent from './TableProductComponent.vue'

export default {
  props: ['products'],
  components: {
    TableProductComponent
  },
  methods: {
    setStatus(status) {
      this.$emit('setStatus', status)
    },

    getProductById(id) {
      this.$emit('getProductById', { id: id, formStatus: 'edit' })
    }
  }
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="col-12">
        <button @click.prevent="$emit('changePage', 'form')" class="btn btn-primary mb-5">
          Add New
        </button>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Data Product</h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" width="180px">Image</th>
                    <th scope="col" width="250px">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Author</th>
                    <th scope="col">Status</th>
                    <th scope="col" width="50px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <TableProductComponent
                    v-for="(product, index) in products"
                    :key="product.id"
                    :product="product"
                    :index="index"
                    @getProductById="getProductById"
                    @setStatus="setStatus"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
