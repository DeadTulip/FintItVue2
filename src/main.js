// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import Welcome from './components/Welcome'
import Login from './components/Login'
import OpenItem from './components/OpenItem'
import ListItems from './components/ListItems'
import ListTeams from './components/ListTeams'
import OpenTeam from './components/OpenTeam'
import ListUsers from './components/ListUsers'

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
    path: '/listTeams',
    component: ListTeams
  }, {
    path: '/openPhysicalItem',
    component: OpenItem,
    props: { itemType: 'Physical' }
  }, {
    path: '/openDigitalItem/:itemId?',
    component: OpenItem,
    props: { itemType: 'Digital' }
  }, {
    path: '/listItems',
    component: ListItems
  }, {
    path: '/team/:teamId?',
    component: OpenTeam
  }, {
    path: '/listUsers',
    component: ListUsers
  }]
})

const store = new Vuex.Store({
  state: {
    domain: 'http://localhost:38083/findit2-backend',
    userInfo: {
      userId: '',
      userName: '',
      userRoles: []
    },
    token: '',
    isLoggedOn: false
  },
  mutations: {
    login: (state, payload) => {
      state.userInfo.userId = payload.userId
      state.userInfo.userName = payload.userName
      state.userInfo.userRoles = payload.userRoles
      state.token = payload.token
      state.isLoggedOn = true
    },
    logout: state => {
      state.userInfo.userId = ''
      state.userInfo.userName = ''
      state.userInfo.userRoles = []
      state.token = ''
      state.isLoggedOn = false
    }
  },
  getters: {
    axiosTokenConfig (state) {
      return (method, url) => {
        return {
          method: method,
          baseURL: state.domain,
          url: url,
          headers: {
            'X-Auth-Token': state.token
          }
        }
      }
    }
  },
  plugins: [createPersistedState()]
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
        var curPath = this.$router.currentRoute.fullPath
        this.$router.push(curPath)
      }
    }
  }
})
