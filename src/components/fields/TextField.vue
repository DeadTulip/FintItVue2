<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-8">
      <input v-if="!readonly" :value="value" @input="$emit('input', $event.target.value)" class="form-control" />
      <div v-else class="readonlyLabel">{{value}}</div>
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
<style scoped>
  div.readonlyLabel {
    margin-top: 10px
  }
</style>
