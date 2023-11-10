<script>
export default {
  props: ['currentPage']
}
</script>

<template>
  <div class="nk-sidebar">
    <div class="nk-nav-scroll">
      <ul class="metismenu" id="menu">
        <li class="nav-label">Dashboard</li>
        <li>
          <a @click="$emit('changePage', 'home')" aria-expanded="false">
            <i class="icon-speedometer menu-icon"></i><span class="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a @click="$emit('changePage', 'product')" aria-expanded="false">
            <i class="icon-badge menu-icon"></i><span class="nav-text">Product</span>
          </a>
        </li>
        <li>
          <a @click="$emit('changePage', 'category')" aria-expanded="false">
            <i class="icon-grid menu-icon"></i><span class="nav-text">Category</span>
          </a>
        </li>
        <li>
          <a @click="$emit('changePage', 'log')" aria-expanded="false">
            <i class="icon-grid menu-icon"></i><span class="nav-text">Logs</span>
          </a>
        </li>
        <li>
          <a @click.prevent="$emit('doLogout')" aria-expanded="false">
            <i class="icon-key"></i><span class="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
