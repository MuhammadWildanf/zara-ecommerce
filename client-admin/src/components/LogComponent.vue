<script>
import TableLogComponent from './TableLogComponent.vue'

export default {
  components: {
    TableLogComponent
  },
  props: ['histories']
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Data History Log</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col" width="180px">Description</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated By</th>
                </tr>
              </thead>
              <tbody>
                <TableLogComponent
                  v-for="(history, index) in histories"
                  :key="history.id"
                  :history="history"
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
