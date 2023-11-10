<script>
import TableCategoryComponent from './TableCategoryComponent.vue'
export default {
  components: {
    TableCategoryComponent
  },
  props: ['categories']
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Data Categories</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                <TableCategoryComponent
                  v-for="(category, index) in categories"
                  :key="category.id"
                  :category="category"
                  :index="index"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
