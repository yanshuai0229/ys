<template>
  <div class="text-center">
    <div class="form-signin">
      <img class="signin-img" src="@/assets/images/login-img.jpg" alt=""/>
      <h1 class="h3 mb-3 font-weight-normal">Please Sign In</h1>
      <label for="inputEmail" class="sr-only">Email Account</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model.trim="account" @blur="$v.account.$touch()" @keyup.13="login()">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()" @keyup.13="login()">
      <!--<div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>-->
      <!--<div class="checkbox mb-3">
        <a href="javascript:;" class="form_signin_a" @click="goRegister()">Register</a>
      </div>-->
      <button class="btn btn-lg btn-primary btn-block" @click="login()">Sign In</button>
      <div class="mt-5 mb-3 error_color">
        <div v-if="!$v.account.required && $v.account.$dirty">Please enter account</div>
        <div v-if="!$v.account.email">Account is not Legal</div>
        <div v-if="!$v.password.required && $v.password.$dirty">Please enter password</div>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
  import {required, email} from 'vuelidate/lib/validators';
  const Base64 = require('js-base64').Base64;
  export default {
    components: {},
    data () {
      return {
        message: '',
        account: '',
        password: '',
        timer: ''
      }
    },
    validations: {
      account: {
        required, email
      },
      password: {
        required
      }
    },
    computed: {},
    mounted () {
    },
    created () {
    },
    methods: {
      login () {
        if (!this.$v.$invalid) {
          this.$api.post(this.$global.noAuthApiPath, '/loginPost', {account: this.account, password: Base64.encode(this.password)}, r => {
            this.message = r.result
            this.$store.commit('set_token_info', {userId: r.data[0], token: r.data[1], role: r.data[2]})
            this.$router.push({path: '/index'})
          }, e => {
            this.message = e
            this.$snotify.error(e);
          })
        }
      },
      goRegister () {
        this.$router.push({path: '/register'})
      }
    }
  }
</script>

<style lang="scss">
</style>
