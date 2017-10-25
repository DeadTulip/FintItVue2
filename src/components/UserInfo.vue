<template>
  <div class="container">
    <h2>{{user.username}}</h2>
    <label>Created teams</label>

      <div class="input-group">
        <input type="text" class="form-control" v-model="teamName">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit" @click="createTeam">Create team</button>
                </span>
      </div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th data-sortable="true">name</th>
        <th>manage</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in createdTeams">
          <td>{{index+1}}</td>
          <td>{{team.teamName}}</td>
          <td>
              <router-link :to="'/team'">
                  <span class="glyphicon glyphicon-cog"></span>
              </router-link>
          </td>
        </tr>
      </tbody>
    </table>


    <label>Joined Teams</label>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th data-sortable="true">name</th>
        <th>leave</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in joinedTeams">
          <td>{{index+1}}</td>
          <td>{{team.teamName}}</td>
          <td>
            <a href="#">
              <span class="glyphicon glyphicon-log-out"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        createdItemCount: 10,
        accessibleItemCount: 20,
        user: {
          username: this.$store.state.userInfo.userName
        },
        teamName: '',
        createdTeams: [],
        joinedTeams: []
      }
    },
    created () {
      const vm = this
      var config = {
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/user/' + this.$store.state.userInfo.userId + '/detail',
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      axios.request(config)
        .then(function (response) {
          vm.createdTeams = response.data.createdTeams
          vm.joinedTeams = response.data.joindTeams
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      createTeam () {
        const vm = this
        var config = {
          method: 'POST',
          baseURL: this.$store.state.domain,
          url: '/team',
          data: {
            teamName: vm.teamName,
            creator: {
              userId: this.$store.state.userInfo.userId
            }
          },
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(config)
          .then(function (response) {
            vm.createdTeams.push({'teamName': vm.teamName})
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
