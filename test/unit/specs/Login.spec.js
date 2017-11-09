import Login from '@/components/Login'

describe('Login', () => {
  it('sets the correct default data', () => {
    expect(typeof Login.data).to.equal('function')
    const defaultData = Login.data()
    expect(defaultData.username).to.equal('')
    expect(defaultData.password).to.equal('')
  })
})
