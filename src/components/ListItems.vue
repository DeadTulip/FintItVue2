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
          <td>{{item.dateCreated}}</td>
          <td>{{item.dateUpdated}}</td>
          <td>{{item.itemType}}</td>
          <td>{{item.owner.username}}</td>
          <td>
            <span v-if="!ownItem(index)">
              <router-link :to="'/openDigitalItem/' + item.itemId">
                <span class="glyphicon glyphicon-eye-open"></span>
              </router-link>
            </span>
            <span v-else>
              <router-link :to="'/openDigitalItem/' + item.itemId">
                <span class="glyphicon glyphicon-edit"></span>
              </router-link>
              <span class="glyphicon glyphicon-remove clickable" @click="deleteItem(index)"></span>
            </span>
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
    },
    methods: {
      deleteItem (index) {
        const vm = this
        var config = {
          method: 'DELETE',
          baseURL: this.$store.state.domain,
          url: '/item/' + this.items[index].itemId,
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(config)
          .then(function (response) {
            vm.items.splice(index, 1)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      ownItem (index) {
        return this.items[index].owner.userId === this.$store.state.userInfo.userId
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
