import { assert } from 'chai'
import Login from '@/components/Login'

describe('Login', () => {
  it('sets the correct default data', () => {
    assert.isFunction(Login.data)
    const defaultData = Login.data()
    assert.equal(defaultData.username, '')
    assert.equal(defaultData.password, '')
  })
})
