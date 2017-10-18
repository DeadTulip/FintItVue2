<template>
  <div class="form-group">
    <label class="control-label col-sm-2">
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-8">
      <multiselect v-model="selectedValues" :options="options" :multiple="true" @input="handleInput"></multiselect>
    </div>
  </div>
</template>

<script>
  import multiselect from 'vue-multiselect'
  export default {
    name: 'MultiselectField',
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
      options: {
        type: Array,
        default: []
      }
    },
    components: {
      multiselect
    },
    data () {
      return {
        selectedValues: []
      }
    },
    methods: {
      handleInput () {
        this.$emit('input', this.selectedValues)
      }
    }
  }
</script>
