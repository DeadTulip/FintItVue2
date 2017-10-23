<template>
  <div class="container">
      <h2 class="form-signin-heading">Sign in</h2>
      <template v-if="errorMessageExist">
      <div class="alert alert-warning">
        <strong>{{errorMsg}}</strong>
      </div>
      </template>
      <input type="text" name="userName" v-model="username"
             placeholder="Username" id="username" class='formLogin form-control' />
      <input type="password" name="password" v-model="password"
             placeholder="Password" id="password" class='formLogin form-control' />

      <div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-default" name="btnRegister" type="submit">Register</button>
      <button class="btn btn-primary" name="btnSignIn" @click="tryLogin" >Sign in</button>

  </div>
</template>
<script>
  export default {
    name: 'Login',
    props: [ 'errorMsg' ],
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      errorMessageExist () {
        return this.errorMsg !== undefined && this.errorMsg !== ''
      }
    },
    methods: {
      tryLogin () {
        if (this.username !== '' && this.password !== '') {
          var store = this.$store
          var router = this.$router
          var config = {
            method: 'POST',
            baseURL: this.$store.state.domain,
            url: '/authenticate',
            headers: {
              'X-Auth-Username': this.username,
              'X-Auth-Password': this.password
            }
          }
          this.$axios.request(config)
            .then(function (response) {
              store.state.userInfo.userId = response.data.userId
              store.state.userInfo.userName = response.data.userName
              store.state.token = response.data.token
              store.state.isLoggedOn = true
              router.push('/userInfo')
            })
            .catch(function (error) {
              console.log(error)
              router.push('/errorLogin')
            })
        } else {
          this.$router.push('/errorLogin')
        }
      }
    }

  }
</script>
