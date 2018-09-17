<template>
  <div class="text-center">
    <div class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please Sign Up</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model.trim="account" @blur="$v.account.$touch()">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
      <label for="inputPasswordConfirm" class="sr-only">Confirm Password</label>
      <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password" v-model.trim="passwordConfirm" @blur="$v.passwordConfirm.$touch()">
      <div class="checkbox mb-3">
        <a href="javascript:;" class="form_signin_a" @click="goLogin()">Have an account, Login</a>
      </div>
      <button type="submit" class="btn btn-lg btn-primary btn-block" @click="register()">Sign Up</button>
      <div class="mt-5 mb-3 error_color">
        <div v-if="!$v.account.required && $v.account.$dirty">Please enter account</div>
        <div v-if="!$v.account.email">Account is not Legal</div>
        <div v-if="!$v.password.required && $v.password.$dirty">Please enter password</div>
        <div v-if="!$v.password.minLength || !$v.password.maxLength">Password length must be {{$v.password.$params.minLength.min}} to {{$v.password.$params.maxLength.max}} bits</div>
        <div v-if="!$v.passwordConfirm.sameAsPassword">Passwords must be identical.</div>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
  import {required, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators';
  const Base64 = require('js-base64').Base64;
  export default {
    components: {},
    data () {
      return {
        message: '',
        account: '',
        password: '',
        passwordConfirm: ''
      }
    },
    validations: {
      account: {
        required, email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password')
      }
    },
    computed: {},
    mounted () {
    },
    created () {
    },
    methods: {
      register () {
        if (!this.$v.$invalid) {
          this.$api.post(this.$global.noAuthApiPath, '/register', {account: this.account, password: Base64.encode(this.password)}, r => {
            this.$router.push({path: '/login'})
          })
        }
      },
      goLogin () {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style lang="scss">
</style>
