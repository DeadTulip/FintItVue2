<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link :to="'/welcome'" class="navbar-brand">FindIt-Vue</router-link>
      </div>
        <ul class="nav navbar-nav">
          <li class="dropdown" v-bind:class="{active: openItem}">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
              <span class="glyphicon glyphicon-plus"></span> Add Item
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link :to="'/openDiskItem'">
                  <span @click="clickOpenDiskItem">Add Disk Item</span>
                </router-link>
              </li>
              <li>
                <router-link :to="'/openPhysicalItem'">
                  <span @click="clickOpenPhysicalItem">Add Physical Item</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-bind:class="{active: activeMenu == 'listItems'}">
            <router-link :to="'/listItems'">
              <span @click="clickListItems">
                <span class="glyphicon glyphicon-th-list"></span> List Items
              </span>
            </router-link>
          </li>

        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-bind:class="{active: activeMenu == 'userInfo'}">
            <router-link :to="'/userInfo'">
              <span @click="clickUserInfo">
                <span class="glyphicon glyphicon-user"></span> {{userName}}
              </span>
            </router-link>
          </li>
          <li>
            <a><span class="glyphicon glyphicon-log-out"></span> Logout</a>
          </li>
        </ul>
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
        return this.activeMenu === 'openPhysicalItem' || this.activeMenu === 'openDiskItem'
      },
      userName () {
        return 'DummyName'
      }
    },
    methods: {
      clickOpenDiskItem () {
        this.activeMenu = 'openDiskItem'
      },
      clickOpenPhysicalItem () {
        this.activeMenu = 'openPhysicalItem'
      },
      clickListItems () {
        this.activeMenu = 'listItems'
      },
      clickUserInfo () {
        this.activeMenu = 'userInfo'
      }
    }
  }
</script>

<style>
</style>
