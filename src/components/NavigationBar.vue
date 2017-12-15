<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link :to="'/welcome'" class="navbar-brand">FindIt-Vue</router-link>
      </div>
      <template v-if="this.$store.state.isLoggedOn">
        <template v-if="!this.$store.state.userInfo.userRoles.includes('ADMIN')">
          <ul class="nav navbar-nav">
            <li class="dropdown" v-bind:class="{active: openItem}">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <span class="glyphicon glyphicon-plus"></span> Add Item
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link :to="'/openDigitalItem'">
                    <span @click="clickOpenDigitalItem">Add Disk Item</span>
                  </router-link>
                </li>
                <!--<li>-->
                  <!--<router-link :to="'/openPhysicalItem'">-->
                    <!--<span @click="clickOpenPhysicalItem">Add Physical Item</span>-->
                  <!--</router-link>-->
                <!--</li>-->
              </ul>
            </li>
            <li v-bind:class="{active: activeMenu == 'listItems'}">
              <router-link :to="'/listItems'">
                <span @click="clickListItems">
                  <span class="glyphicon glyphicon-th-list"></span> List Items
                </span>
              </router-link>
            </li>
            <li v-bind:class="{active: activeMenu == 'listTeams'}">
              <router-link :to="'/listTeams'">
                <span @click="clickListTeams">
                  <span class="glyphicon glyphicon-th-list"></span> List Teams
                </span>
              </router-link>
            </li>
          </ul>
        </template>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a><span class="glyphicon glyphicon-user"></span> {{userName}}</a>
          </li>
          <li>
            <router-link :to="'/login'">
              <span @click="logout">
                <a><span class="glyphicon glyphicon-log-out"></span> Logout</a>
              </span>
            </router-link>
          </li>
        </ul>
      </template>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        activeMenu: ''
      }
    },
    computed: {
      openItem () {
        return this.activeMenu === 'openPhysicalItem' || this.activeMenu === 'openDigitalItem'
      },
      userName () {
        return this.$store.state.userInfo.userName
      }
    },
    methods: {
      clickOpenDigitalItem () {
        this.activeMenu = 'openDigitalItem'
      },
      clickOpenPhysicalItem () {
        this.activeMenu = 'openPhysicalItem'
      },
      clickListItems () {
        this.activeMenu = 'listItems'
      },
      clickListTeams () {
        this.activeMenu = 'listTeams'
      },
      logout () {
        this.$store.commit('logout')
      }
    }
  }
</script>
