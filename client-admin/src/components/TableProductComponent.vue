<script>
export default {
  props: ['product', 'index'],
  methods: {
    setStatus(status) {
      this.$emit("setStatus", status)
    },
    getProductById(id) {
      this.$emit("getProductById", id)
    }
  },
  data() {
    return {
      role: localStorage.role,
      userid: localStorage.userid
    }
  }
}
</script>

<template>
  <tr :key="product.id">
    <td>{{ index + 1 }}</td>
    <td>{{ product.name }}</td>
    <td><img :src="product.imgUrl" class="img-fluid" /></td>
    <td>{{ product.description }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.User.email }}</td>
    <td>{{ product.status }}</td>
    <td style="text-align: center">
      <select
        v-model="product.status"
        class="form-select"
        @change="setStatus({ id: product.id, status: product.status })"
        style="text-align: center"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Archived">Archived</option>
      </select>
    </td>
    <td>
      <button
        v-if="role === 'admin'"
        @click="getProductById(product.id)"
        class="btn btn-warning btn-sm text-white"
      >
        <i class="fa fa-pencil" aria-hidden="true"></i>
        Edit
      </button>
      <button
        v-else="role === 'staf' && userid === `${product.authorId}`"
        @click="getProductById(product.id)"
        class="btn btn-warning btn-sm text-white"
      >
        <i class="fa fa-pencil" aria-hidden="true"></i>
        Edit
      </button>
    </td>
  </tr>
</template>
