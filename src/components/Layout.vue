<template>
  <div id="layout">
    <NavigationBar></NavigationBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavigationBar from './NavigationBar'

  export default {
    components: {
      NavigationBar
    },
    data () {
      return {
        itemType: ''
      }
    },
    methods: {
//      onClickNavigationBar (value) {
//        if (value === 'openPhysicalItem') {
//          this.page = 'openItem'
//          this.itemType = 'Physical'
//        } else if (value === 'openDiskItem') {
//          this.page = 'openItem'
//          this.itemType = 'Disk'
//        } else {
//          this.page = value
//          this.$router.push('/userInfo')
//          console.log('userinfo')
//        }
//      }
    }
  }
</script>

<style>
</style>
