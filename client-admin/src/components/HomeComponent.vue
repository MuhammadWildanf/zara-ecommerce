<script>
export default {
  props: ['products', 'categories', 'histories'],
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-1">
            <div class="card-body">
              <h3 class="card-title text-white">Products</h3>
              <div class="d-inline-block">
                <h2 class="text-white">{{products.length}}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-2">
            <div class="card-body">
              <h3 class="card-title text-white">Categories</h3>
              <div class="d-inline-block">
                <h2 class="text-white">{{ categories.length }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
