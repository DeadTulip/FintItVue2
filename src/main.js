// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Welcome from './components/Welcome'
import OpenItem from './components/OpenItem'
import ListItems from './components/ListItems'
import UserInfo from './components/UserInfo'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/welcome',
    component: Welcome
  }, {
    path: '/userInfo',
    component: UserInfo
  }, {
    path: '/openPhysicalItem',
    component: OpenItem,
    props: { itemType: 'Physical' }
  }, {
    path: '/openDiskItem',
    component: OpenItem,
    props: { itemType: 'Disk' }
  }, {
    path: '/listItems',
    component: ListItems
  }]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
