import { assert, expect } from 'chai'
import { mount, createLocalVue } from 'vue-test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ListItems from '@/components/ListItems'
import MockAdapter from 'axios-mock-adapter'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ListItems', () => {
  let store = new Vuex.Store({
      state: {
        userInfo: {
          userId: '1',
          userName: 'haihan',
          userRoles: []
        },
        token: '12345',
        isLoggedOn: false
      }
    })

  it('should show items after loaded', () => {
    let mock = new MockAdapter(axios)
    mock.onGet('/user/1/items').reply(200, [
          { name: 'name1',
            dateCreated: '2017-10-11',
            dateUpdated: '2017-10-11',
            itemType: 'Digital',
            owner: {userId: '1', username: 'haihan'}
          }
    ])
    const wrapper = mount(ListItems, {
      localVue, store, attachToDocument: true, stubs: ['router-link', 'router-view']
    })
    Vue.nextTick(() => {
      wrapper.update()
      assert.equal(wrapper.vm.items.length, 1)
      wrapper.find('.glyphicon-remove')
    })
  })
})
