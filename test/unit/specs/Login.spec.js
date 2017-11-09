import assert from 'assert'
import Login from '@/components/Login'

describe('Login', () => {
  it('sets the correct default data', () => {
    assert.equal(typeof Login.data, 'function')
    const defaultData = Login.data()
    assert.equal(defaultData.username, '')
    assert.equal(defaultData.password, '')
  })
})
