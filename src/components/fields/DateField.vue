<template>
  <div class="form-group">
    <label class="control-label col-sm-2" >
      {{fieldName}}: {{ mandatory ? '*' : '' }}
    </label>
    <div class="col-sm-3" id="eventStartDateContainer">
      <div v-if="!readonly" class="input-group">
        <datePicker :date="dateValue" @change="input"></datePicker>
        <span class="input-group-btn">
          <button id="todayBtn" class="btn btn-secondary" @click="setDateToToday">Today</button>
        </span>
      </div>
      <span v-else>
        <div class="readonlyLabel">{{dateValue.time}}</div>
      </span>
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
      },
      setDateToToday () {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1 //  January is 0!
        var yyyy = today.getFullYear()
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        this.dateValue.time = yyyy + '-' + mm + '-' + dd
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
<style scoped>
  button#todayBtn {
    height: 38px;
  }
  div.readonlyLabel {
    margin-top: 10px
  }
</style>
