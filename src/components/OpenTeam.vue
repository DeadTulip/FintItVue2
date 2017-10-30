<template>
    <div class="container">
      <h2>{{teamName}}</h2>
      <div><label>Creator</label> {{creatorName}}</div>
      <label>Members</label>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>#</th>
          <th data-sortable="true">member name</th>
          <th data-sortable="true">items</th>
          <th>manage</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :class="{highlight: toHighlightMember === member.username}">
            <td>{{index+1}}</td>
            <td>{{member.username}}</td>
            <td>{{member.itemCount}}</td>
            <td>
              <span class="glyphicon glyphicon-remove"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
      <div v-if="addMemberErrorMessage" class="alert alert-danger">
        <strong>Error: </strong> {{addMemberErrorMessage}}
      </div>
      <div class="input-group">
        <input type="text" v-model="toAddMemberName" class="form-control">
          <span class="input-group-btn">
              <button class="btn btn-primary" @click="addMember">add member</button>
          </span>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        teamId: this.$route.params.teamId,
        teamName: '',
        creatorName: '',
        toAddMemberName: '',
        toHighlightMember: '',
        members: [],
        addMemberErrorMessage: ''
      }
    },
    created () {
      var config = {
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/team/' + this.teamId,
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      const vm = this
      axios.request(config)
        .then(function (response) {
          vm.teamName = response.data.teamName
          vm.members = response.data.members
          vm.creatorName = response.data.creator.username
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      addMember () {
        const vm = this
        if (!this.containsMember(this.toAddMemberName)) {
          var config = {
            method: 'PUT',
            baseURL: this.$store.state.domain,
            url: '/team/' + this.teamId + '/addMember/' + this.toAddMemberName,
            headers: {
              'X-Auth-Token': this.$store.state.token
            }
          }
          axios.request(config)
            .then(function (response) {
              vm.addMemberErrorMessage = ''
              vm.members.push(response.data)
              vm.toHighlightMember = response.data.userId
            })
            .catch(function (error) {
              vm.toHighlightMember = ''
              if (error.response.status === 404) {
                vm.addMemberErrorMessage = error.response.data.errorMessage
              }
            })
        } else {
          vm.toHighlightMember = this.toAddMemberName
        }
      },
      containsMember (username) {
        for (var i = 0; i < this.members.length; i++) {
          if (this.members[i].username === username) {
            return true
          }
        }
        return false
      }
    }
  }
</script>
<style>
  .highlight {
    background-color: #CFF5FF;
  }
</style>
