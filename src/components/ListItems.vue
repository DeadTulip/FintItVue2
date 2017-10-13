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
          <td>{{item.location['@type']}}</td>
          <td>{{item.ownerName}}</td>
          <td>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        items: []
      }
    }
  }
</script>
