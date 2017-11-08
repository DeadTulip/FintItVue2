<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-6">
      <input :value="value" @input="$emit('input', $event.target.value)" class="form-control" :disabled="readonly" />
      <div class="errors">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextField',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      fieldName: {
        type: String,
        required: true
      },
      mandatory: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>
