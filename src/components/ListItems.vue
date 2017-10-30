<template>
  <div class="container">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th data-sortable="true">name</th>
        <th data-sortable="true">dateCreated</th>
        <th data-sortable="true">dateUpdated</th>
        <th data-sortable="true">item type</th>
        <th data-sortable="true">owner</th>
        <th>view/edit</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td></td>
          <td></td>
          <td>{{item.itemType}}</td>
          <td>{{item.owner.username}}</td>
          <td>
            <router-link :to="'/openDigitalItem/' + item.itemId">
              <span class="glyphicon glyphicon-edit"></span>
            </router-link>
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
        items: []
      }
    },
    created () {
      var config = {
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/user/' + this.$store.state.userInfo.userId + '/items',
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      const vm = this
      axios.request(config)
        .then(function (response) {
          vm.items = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
</script>
