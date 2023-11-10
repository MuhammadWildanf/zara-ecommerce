<script>
export default {
  props: ['currentPage']
}
</script>

<template>
  <div>
    <div class="nav-header">
      <div class="brand-logo">
        <a href="/">
          <b class="logo-abbr"> <h1 class="text-center text-white">Z</h1> </b>
          <span class="logo-compact"><h1 class="text-center text-white">Z</h1> </span>
          <span class="brand-title">
            <h1 class="text-center text-white">ZARA</h1>
          </span>
        </a>
      </div>
    </div>

    <div class="header">
      <div class="header-content clearfix">
        <div class="header-left">
          <!--  -->
        </div>
        <div class="header-right">
          <ul class="clearfix">
            <li class="icons dropdown">
              <div class="user-img c-pointer position-relative" data-toggle="dropdown">
                <span class="activity active"></span>
                <img src="../assets/images/users/1.jpg" height="40" width="40" alt="" />
              </div>
              <div class="drop-down dropdown-profile animated fadeIn dropdown-menu">
                <div class="dropdown-content-body">
                  <ul>
                    <li>
                      <a href="" @click.prevent="$emit('doLogout')"
                        ><i class="icon-key"></i> <span>Logout</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
