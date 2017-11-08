<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-8">
      <textarea :value="value" @input="$emit('input', $event.target.value)" class="form-control" rows="3" :disabled="readonly"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextareaField',
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
