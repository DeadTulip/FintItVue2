<template>
  <div class="form-group">
    <label class="control-label col-sm-2" >
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-3" id="eventStartDateContainer">
      <datePicker :date="dateValue" :disabled="readonly" @change="handleInput"></datePicker>
    </div>
    <div class="errors">

    </div>
  </div>
</template>

<script>
  import datePicker from 'vue-datepicker/vue-datepicker-es6.vue'
  export default {
    name: 'DateField',
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
    components: {
      datePicker
    },
    data () {
      return {
        dateValue: {
          time: ''
        }
      }
    },
    methods: {
      handleInput () {
        this.$emit('input', this.dateValue.time)
      }
    }
  }
</script>
