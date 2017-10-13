<template>
  <div class="container">
    <h2>{{user.username}}</h2>
    <div><label>Owned items:</label> <a href="#">{{createdItemCount}}</a> </div>
    <div><label>Accessible items:</label> <a href="#">{{accessibleItemCount}}</a> </div>
    <label>My teams</label>
    <form>
      <div class="input-group">
        <input type="text" class="form-control" name="teamName">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">Create team</button>
                </span>
      </div>
    </form>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th data-sortable="true">name</th>
        <th>manage</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in ownedTeams">
          <td>{{index+1}}</td>
          <td>{{team.teamName}}</td>
          <td>
            <a href="#">
              <span class="glyphicon glyphicon-cog"></span>
            </a>
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
  export default {
    data () {
      return {
        createdItemCount: 10,
        accessibleItemCount: 20,
        user: {
          username: 'Me'
        },
        ownedTeams: [
          { teamName: 'team1' },
          { teamName: 'team2' }
        ],
        joinedTeams: [
          { teamName: 'team3' },
          { teamName: 'team4' }
        ]
      }
    }
  }
</script>
