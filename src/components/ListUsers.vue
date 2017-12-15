<template>
  <div class="container">
    <div v-if="createUserErrorMessage" class="alert alert-danger">
      <strong>Error: </strong> {{createUserErrorMessage}}
    </div>
    <div class="input-group">
      <span class="input-group-addon">User name</span>
      <input type="text" class="form-control" v-model="toCreateUsername">
      <span class="input-group-addon">Password</span>
      <input type="text" class="form-control" v-model="toCreatePassword">
      <span class="input-group-btn">
          <button class="btn btn-primary" @click="createUser">Create user</button>
      </span>
    </div>
    <br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="col-md-1">#</th>
        <th class="col-md-1" data-sortable="true">User id</th>
        <th class="col-md-6" data-sortable="true">User name</th>
        <th class="col-md-1" data-sortable="true">Remove user</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users">
        <td>{{index+1}}</td>
        <td>{{user.userId}}</td>
        <td>{{user.username}}</td>
        <td>
          <span v-if="!user.roles.includes('ADMIN')" class="glyphicon glyphicon-remove clickable"></span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  export default {
    data () {
      return {
        createUserErrorMessage: '',
        toCreateUsername: '',
        toCreatePassword: '',
        users: []
      }
    },
    created () {
      var config = {
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/user/all',
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      const vm = this
      axios.request(config)
        .then(function (response) {
          vm.users = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      createUser () {
        const vm = this
        var config = this.$store.getters.axiosTokenConfig('POST', '/user')
        config.data = {
          username: vm.toCreateUsername,
          password: vm.toCreatePassword
        }
        axios.request(config)
          .then(function (response) {
            vm.users.push(response.data)
            vm.createUserErrorMessage = ''
            vm.toCreateUsername = ''
            vm.toCreatePassword = ''
          })
          .catch(function (error) {
            vm.createUserErrorMessage = error.response.data.errorMessage
          })
      }
    }
  }
</script>
<style scoped>
  .clickable {
    cursor: pointer;
    color: #337ab7;
  }
</style>
