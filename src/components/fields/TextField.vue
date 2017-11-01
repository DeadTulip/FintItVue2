<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-6">
      <input v-model="fieldValue" class="form-control" :disabled="readonly" @input="input"/>
      <div class="errors">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextField',
    model: {
      prop: 'fieldValue',
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
      fieldValue: {
        type: String,
        default: ''
      }
    },
    methods: {
      input () {
        this.$emit('input', this.fieldValue)
      }
    }
  }
</script>
