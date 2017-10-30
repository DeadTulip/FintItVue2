<template>
  <div class="container">
    <label>Created teams</label>
     <div v-if="createTeamErrorMessage" class="alert alert-danger">
       <strong>Error: </strong> {{createTeamErrorMessage}}
     </div>
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
        <tr v-for="(team, index) in teams">
          <td>{{index+1}}</td>
          <td>{{team.teamName}}</td>
          <td>
              <router-link :to="'/team/' + team.teamId">
                  <span class="glyphicon glyphicon-cog"></span>
              </router-link>
              <span class="glyphicon glyphicon-remove clickable" @click="deleteTeam(index)"></span>
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
        teams: [],
        createTeamErrorMessage: ''
      }
    },
    created () {
      const vm = this
      var config = {
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/user/' + this.$store.state.userInfo.userId + '/teams',
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      axios.request(config)
        .then(function (response) {
          vm.teams = response.data
        })
        .catch(function (error) {
          alert(error)
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
            vm.createTeamErrorMessage = ''
            vm.teams.push({'teamName': vm.teamName})
          })
          .catch(function (error) {
            vm.createTeamErrorMessage = error.response.data.errorMessage
          })
      },
      deleteTeam (index) {
        const vm = this
        var config = {
          method: 'DELETE',
          baseURL: this.$store.state.domain,
          url: '/team/' + this.createdTeams[index].teamId,
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(config)
          .then(function (response) {
            vm.createdTeams.splice(index, 1)
          })
          .catch(function (error) {
            console.log(error)
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
