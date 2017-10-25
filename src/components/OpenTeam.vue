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
          <tr v-for="(member, index) in members">
            <td>{{index+1}}</td>
            <td>{{member.name}}</td>
            <td>{{member.itemCount}}</td>
            <td>
              <span class="glyphicon glyphicon-remove"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
      <div class="input-group">
        <input type="text" class="form-control">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">add member</button>
                </span>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        teamName: 'tempTeamName',
        creatorName: 'teampCreatorName',
        members: [
          {name: 'name1', itemCount: 1},
          {name: 'name2', itemCount: 2}
        ]
      }
    }
  }
</script>
