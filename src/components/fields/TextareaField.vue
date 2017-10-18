<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-8">
      <textarea v-model="fieldValue" class="form-control" rows="3" :disabled="readonly" @input="handleInput"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextareaField',
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
      }
    },
    data () {
      return {
        fieldValue: ''
      }
    },
    methods: {
      handleInput () {
        this.$emit('input', this.fieldValue)
      }
    }
  }
</script>
