<template>
  <div class="container" id="openItem">
    <h2 v-if="itemId != null">Update {{itemType}} Item</h2>
    <h2 v-else="">Add {{itemType}} Item</h2>

    <div v-if="createItemMessage" class="alert alert-success">
      <strong>Info: </strong> {{createItemMessage}}
    </div>

    <form class="form-horizontal">

      <MultiselectField fieldName="Shared teams" :options="sharedTeamsOptions" @input="sharedTeams = arguments[0]"></MultiselectField>

      <div v-if="itemType == 'Digital'">
          <TextField fieldName="Name" :mandatory="true" @input="itemName = arguments[0]"></TextField>
          <TextField fieldName="Type" :mandatory="true" @input="fileType = arguments[0]"></TextField>
          <TextField fieldName="Size" :mandatory="true" @input="fileSize = arguments[0]"></TextField>
      </div>
      <div v-if="itemType == 'Physical'">
        <div id="openPhysicalItem">
          <div class="form-group">
            <label class="control-label col-sm-2" for="inputItemName">Picture:</label>
            <div class="col-sm-6">
            </div>
          </div>
        </div>
      </div>

      <DateField fieldName="Event start" @input="eventStart = arguments[0]"></DateField>
      <DateField fieldName="Event end" @input="eventEnd = arguments[0]"></DateField>

      <MultiselectField fieldName="Involved people" :options="involvedPeopleOptions" @input="involvedPeople = arguments[0]"></MultiselectField>
      <TextareaField fieldName="Additional people" v-model="additionalPeople"></TextareaField>

      <MultiselectField fieldName="Involved places" :options="involvedPlaceOptions" @input="involvedPlaces = arguments[0]"></MultiselectField>
      <TextareaField fieldName="Additional places" v-model="additionalPlaces"></TextareaField>

      <TextareaField fieldName="Description" v-model="description"></TextareaField>

    </form>
    <button class="btn btn-primary" name="btnAdd" @click="addItem" >
      <label v-if="itemId != null">Update</label>
      <label v-else>Add</label>
    </button>
  </div>
</template>

<script>
  import axios from 'axios'
  import TextField from './fields/TextField'
  import DateField from './fields/DateField'
  import MultiselectField from './fields/MultiselectField'
  import TextareaField from './fields/TextareaField'

  export default {
    props: [ 'itemType' ],
    components: {
      TextField, DateField, MultiselectField, TextareaField
    },
    data () {
      return {
        itemId: this.$route.params.itemId,
        itemName: '',
        fileType: '',
        fileSize: '',
        sharedTeams: [],
        sharedTeamsOptions: [],
        involvedPeople: [],
        involvedPeopleOptions: [],
        additionalPeople: '',
        involvedPlaces: [],
        involvedPlaceOptions: [],
        additionalPlaces: '',
        readonly: false,
        description: '',
        eventStart: '',
        eventEnd: '',
        createItemMessage: ''
      }
    },
    created () {
      var config = {
        method: 'POST',
        baseURL: this.$store.state.domain,
        url: '/item/toAdd',
        data: {
          userId: this.$store.state.userInfo.userId
        },
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      const vm = this
      axios.request(config)
        .then(function (response) {
          vm.sharedTeamsOptions = response.data.sharedTeamsOptions
          vm.involvedPeopleOptions = response.data.involvedPeopleOptions
          vm.involvedPlaceOptions = response.data.involvedPlaceOptions
        })
        .catch(function (error) {
          console.log(error)
        })

      if (this.itemId != null) {
        var configForGettingItem = {
          method: 'GET',
          baseURL: this.$store.state.domain,
          url: '/item/' + this.itemId,
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(configForGettingItem)
          .then(function (response) {
            vm.itemName = response.data.name
            vm.fileType = response.data.fileType
            vm.fileSize = response.data.fileSize
            vm.description = response.data.description
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    methods: {
      addItem () {
        const vm = this
        var config = {
          method: 'POST',
          baseURL: this.$store.state.domain,
          url: '/item',
          data: this.getAddItemData(),
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(config)
          .then(function (response) {
            vm.createItemMessage = 'Item[' + response.data.name + '] is created.'
            vm.clearData()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      clearData () {
        this.itemName = ''
        this.fileType = ''
        this.fileSize = ''
        this.sharedTeams = []
        this.involvedPeople = []
        this.additionalPeople = ''
        this.involvedPlaces = []
        this.additionalPlaces = ''
        this.description = ''
        this.eventStart = ''
        this.eventEnd = ''
      },
      getAddItemData () {
        var data = {}
        if (this.itemType === 'Digital') {
          data = {
            owner: {
              userId: this.$store.state.userInfo.userId,
              username: this.$store.state.userInfo.userName
            },
            itemType: this.itemType,
            name: this.itemName,
            fileName: this.itemName,
            fileType: this.fileType,
            fileSize: this.fileSize,
            originalFileName: this.itemName + '_original',
            eventStartTime: this.eventStart,
            eventEndTime: this.eventEnd,
            involvedPeople: this.getInvolvedPeople(),
            involvedPlaces: this.getInvolvedPlaces(),
            description: this.description
          }
        } else {

        }
        return data
      },
      getInvolvedPeople () {
        var apArray = this.getValueArray(this.additionalPeople)
        return this.involvedPeople.concat(apArray)
      },
      getInvolvedPlaces () {
        var apArray = this.getValueArray(this.additionalPlaces)
        return this.involvedPlaces.concat(apArray)
      },
      getValueArray (value) {
        if (value.trim().length > 0) {
          var valueArray = value.split(',')
          for (let i = 0; i < valueArray.length; i++) {
            valueArray[i] = valueArray[i].trim()
          }
          return valueArray
        } else {
          return []
        }
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
