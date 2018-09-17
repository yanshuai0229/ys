<template>
  <header class="header_area">
    <div class="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
      <!-- Classy Menu -->
      <nav class="classy-navbar" id="essenceNav">
        <!-- Logo -->
        <router-link class="nav-brand logo-pt" to="/index"><img src="./images/logo.png" alt=""></router-link>
        <!-- Navbar Toggler -->
        <div class="classy-navbar-toggler">
          <span class="navbarToggler"><span></span><span></span><span></span></span>
        </div>
        <!-- Menu -->
        <!--<div class="classy-menu">
          &lt;!&ndash; close btn &ndash;&gt;
          <div class="classycloseIcon">
            <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
          </div>
          &lt;!&ndash; Nav Start &ndash;&gt;
          <div class="classynav">
            <ul>
              <li><router-link to="/list/1">Learn</router-link></li>
              &lt;!&ndash;<li><router-link to="/list/2">Blog</router-link></li>
              <li><router-link to="/list/3">Note</router-link></li>&ndash;&gt;
            </ul>
          </div>
          &lt;!&ndash; Nav End &ndash;&gt;
        </div>-->
      </nav>

      <!-- Header Meta Data -->
      <div class="header-meta d-flex clearfix justify-content-end">
        <!-- Search Area -->
        <!--<div class="search-area">
          <form action="#" method="post">
            <input type="search" name="search" id="headerSearch" placeholder="Type for search">
            <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>-->
        <!-- Admin -->
        <div class="admin-area" v-if="$store.state.token_info.role=='0'">
          <a href="javascript:;" @click="admin()"><img src="./images/admin.svg" alt="后台管理"></a>
        </div>
        <!-- User Login Info -->
        <div class="user-login-info">
          <a href="javascript:;" @click="user()"><img src="./images/user.svg" alt="用户信息"></a>
        </div>
        <!-- User Logout -->
        <div class="exit-area">
          <a href="javascript:;" @click="logout()"><img src="./images/logout.svg" alt="退出登录"></a>
        </div>
      </div>

    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    logout () {
      this.$store.commit('del_token_info')
      this.$router.push({path: '/login'})
    },
    user () {
      this.$router.push({path: '/user'})
    },
    admin () {
      this.$router.push({path: '/admin/menu/list'})
    }
  }
}
</script>
<style scoped>
  @import './header.css';
</style>
