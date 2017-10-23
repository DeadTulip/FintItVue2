// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'

import Welcome from './components/Welcome'
import Login from './components/Login'
import OpenItem from './components/OpenItem'
import ListItems from './components/ListItems'
import UserInfo from './components/UserInfo'

Object.defineProperty(Vue.prototype, '$axios', { value: axios })

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/errorLogin',
    component: Login,
    props: { errorMsg: 'Invalid Login' }
  }, {
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
    props: { itemType: 'Digital' }
  }, {
    path: '/listItems',
    component: ListItems
  }]
})

const store = new Vuex.Store({
  state: {
    domain: 'http://localhost:8090',
    userInfo: {
      userId: '',
      userName: ''
    },
    token: '',
    isLoggedOn: false
  },
  mutations: {
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router,
  render: h => h(App),
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      console.log('userToken is ' + this.$store.state.userToken)
      if (this.$store.state.token === '') {
        this.$router.push('/login')
      } else {
        this.$router.push('/userInfo')
      }
    }
  }
})
