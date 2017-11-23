import { assert } from 'chai'
import { mount } from 'vue-test-utils'
import Vue from 'vue'
import TextField from '@/components/fields/TextField'

describe('TextField', () => {

  it('should show indicator when it is a mandatory field', () => {
    const wrapper = mount(TextField)
    wrapper.setProps({
      fieldName: 'myField',
      mandatory: true
    })
    assert.isAtLeast(wrapper.text().indexOf('myField: *'), 0)
  })

  it('emits input event when input texts', () => {
    const wrapper = mount(TextField)
    const textFieldInput = wrapper.find('input')
    textFieldInput.element.value = 'h'
    textFieldInput.trigger('input')
    assert.isNotNull(wrapper.emitted().input)
    assert.equal(wrapper.emitted().input[0], 'h')
  })
})
