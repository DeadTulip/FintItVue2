<template>
  <div class="container">
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
              <span v-if="ownTeam(index)">
                <router-link :to="'/team/' + team.teamId">
                    <span class="glyphicon glyphicon-cog"></span>
                </router-link>
                <span class="glyphicon glyphicon-remove clickable" @click="deleteTeam(index)"></span>
              </span>
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
      var config = this.$store.getters.axiosTokenConfig('GET', '/user/' + this.$store.state.userInfo.userId + '/teams')
      const vm = this
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
        var config = this.$store.getters.axiosTokenConfig('POST', '/team')
        config.data = {
          teamName: this.teamName,
          creator: {
            userId: this.$store.state.userInfo.userId
          }
        }
        const vm = this
        axios.request(config)
          .then(function (response) {
            vm.createTeamErrorMessage = ''
            vm.teams.push(response.data)
          })
          .catch(function (error) {
            vm.createTeamErrorMessage = error.response.data.errorMessage
          })
      },
      deleteTeam (index) {
        var config = this.$store.getters.axiosTokenConfig('DELETE', '/team/' + this.teams[index].teamId)
        const vm = this
        axios.request(config)
          .then(function (response) {
            vm.teams.splice(index, 1)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      ownTeam (index) {
        return this.teams[index].creator.userId === this.$store.state.userInfo.userId
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
