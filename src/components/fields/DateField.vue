<template>
  <div class="form-group">
    <label class="control-label col-sm-2" >
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-3" id="eventStartDateContainer">
      <datePicker :date="dateValue" :disabled="readonly" @change="input"></datePicker>
    </div>
    <div class="errors">

    </div>
  </div>
</template>

<script>
  import datePicker from 'vue-datepicker/vue-datepicker-es6.vue'
  export default {
    name: 'DateField',
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
      input () {
        this.$emit('input', this.dateValue.time)
      }
    },
    watch: {
      fieldValue: function (val) {
        this.dateValue.time = val
      }
    }
  }
</script>
