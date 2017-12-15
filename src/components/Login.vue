<template>
  <div id="loginForm" class="container center-block">
      <div id="verticalSpace"></div>
      <h2 class="form-signin-heading">Welcome</h2>
      <template v-if="errorMessageExist">
      <div class="alert alert-warning">
        <strong>{{errorMsg}}</strong>
      </div>
      </template>
      <input type="text" name="userName" v-model="username"
             placeholder="Username" id="username" class='formLogin form-control' />
      <input type="password" name="password" v-model="password"
             placeholder="Password" id="password" class='formLogin form-control' />

      <button class="btn btn-primary" name="btnSignIn" id="btnSignIn" @click="tryLogin" >Sign in</button>

  </div>
</template>
<script>
  import axios from 'axios'
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
            baseURL: store.state.domain,
            url: '/authenticate',
            headers: {
              'X-Auth-Username': this.username,
              'X-Auth-Password': this.password
            }
          }
          axios.request(config)
            .then(function (response) {
              store.commit('login', {
                userId: response.data.userId,
                userName: response.data.userName,
                userRoles: response.data.userRoles,
                token: response.data.token
              })
              if (store.state.userInfo.userRoles.includes('ADMIN')) {
                router.push('/listUsers')
              } else {
                router.push('/listTeams')
              }
            })
            .catch(function (error) {
              console.log(error)
              router.push('/errorLogin')
            })
        } else {
          router.push('/errorLogin')
        }
      }
    }

  }
</script>
<style scoped>
  #loginForm {
    width: 40%;
  }
  #loginForm #verticalSpace {
    height: 100px;
  }
  #loginForm input {
    margin-bottom: 5px;
  }
</style>
