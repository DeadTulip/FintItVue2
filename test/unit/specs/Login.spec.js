import { assert } from 'chai'
import { mount, createLocalVue } from 'vue-test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import ListUsers from '@/components/ListUsers'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Login', () => {
  it('has correct default data', () => {
    const vm = mount(Login).vm
    assert.equal(vm.username, '')
    assert.equal(vm.password, '')
  })

  it('content has Sign in', () => {
    const wrapper = mount(Login)
    const htmlContent = wrapper.html()
    assert.isAbove(htmlContent.indexOf("Sign in"), 0)
  })

  it('username value should be changed when the username input is changed', () => {
    const wrapper = mount(Login)
    const usernameInput = wrapper.find('input#username')
    usernameInput.element.value = 'hi'
    usernameInput.trigger('input')
    assert.equal(wrapper.vm.username, 'hi')
  })

  //it('username set data', () => {
  //  let store = new Vuex.Store({
  //    state: {
  //      userInfo: {
  //        userId: '',
  //        userName: '',
  //        userRoles: []
  //      },
  //      token: '',
  //      isLoggedOn: false,
  //    }
  //  })
  //
  //  let router = new VueRouter({
  //    routes: [{
  //      path: '/listUsers',
  //      component: ListUsers
  //    }]
  //  })
  //
  //  let mock = new MockAdapter(axios)
  //  mock.onPost('/authenticate').reply(200, [
  //    { userId: '1',
  //      userName: 'haihan',
  //      userRoles: ['ADMIN'],
  //      token: '1234567'
  //    }
  //  ])
  //
  //  const wrapper = mount(Login, {localVue, store, router})
  //  wrapper.setData({username: 'hh', password: 'yy'})
  //  const signInButton = wrapper.find("button#btnSignIn")
  //  signInButton.trigger('click')
  //
  //})
})
