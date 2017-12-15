<template>
  <div class="container" id="openItem">
    <h2 v-if="itemId != null">Update {{itemType}} Item</h2>
    <h2 v-else="">Add {{itemType}} Item</h2>

    <div v-if="operateItemMessage" class="alert alert-success">
      <strong>Info: </strong> {{operateItemMessage}}
    </div>

    <form class="form-horizontal">

      <TextField fieldName="Item name" v-model="itemName" :readonly="readonly" :mandatory="true"></TextField>


      <p>My File Selector: <FileSelectField v-model="file" @input="fileChange"></FileSelectField></p>

      <div v-if="itemType == 'Physical'">
        <div id="openPhysicalItem">
          <div class="form-group">
            <label class="control-label col-sm-2" for="inputItemName">Picture:</label>
            <div class="col-sm-6">
            </div>
          </div>
        </div>
      </div>

      <DateField fieldName="Event start" v-model="eventStart" :readonly="readonly" ></DateField>
      <DateField fieldName="Event end" v-model="eventEnd" :readonly="readonly" ></DateField>

      <MultiselectField fieldName="Involved people" :options="involvedPeopleOptions" v-model="involvedPeople" :readonly="readonly"></MultiselectField>
      <TextareaField fieldName="Additional people" v-model="additionalPeople" :readonly="readonly"></TextareaField>

      <MultiselectField fieldName="Involved places" :options="involvedPlaceOptions" v-model="involvedPlaces" :readonly="readonly"></MultiselectField>
      <TextareaField fieldName="Additional places" v-model="additionalPlaces" :readonly="readonly"></TextareaField>

      <TextareaField fieldName="Description" v-model="description" :readonly="readonly"></TextareaField>

      <MultiselectField fieldName="Shared teams" :options="sharedTeamsOptions" @input="sharedTeams = arguments[0]" :readonly="readonly"></MultiselectField>
    </form>
    <span v-if="!readonly">
      <button v-if="itemId != null" class="btn btn-primary" name="btnAdd" @click="updateItem" >
        <label>Update</label>
      </button>
      <button v-else="" class="btn btn-primary" name="btnAdd" @click="addItem" >
        <label>Add</label>
      </button>
    </span>
  </div>
</template>

<script>
  import axios from 'axios'
  import TextField from './fields/TextField'
  import DateField from './fields/DateField'
  import MultiselectField from './fields/MultiselectField'
  import TextareaField from './fields/TextareaField'
  import FileSelectField from './fields/FileSelectField'

  export default {
    props: ['itemType'],
    components: {
      TextField, DateField, MultiselectField, TextareaField, FileSelectField
    },
    data () {
      return {
        ownerId: '',
        itemId: this.$route.params.itemId,
        itemName: '',
        file: null,
        fileBase64: '',
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
        operateItemMessage: ''
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
            vm.fileSize = vm.getIntegerValue(response.data.fileSize)
            vm.description = response.data.description
            vm.eventStart = response.data.eventStartTime
            vm.eventEnd = response.data.eventEndTime
            vm.involvedPeople = vm.getValueArray(response.data.involvedPeople)
            vm.involvedPlaces = vm.getValueArray(response.data.involvedPlaces)
            vm.ownerId = response.data.owner.userId
            vm.readonly = vm.isReadonly()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    methods: {
      addItem () {
        var config = this.$store.getters.axiosTokenConfig('POST', '/item')
        config.data = this.getAddItemData()
        const vm = this
        axios.request(config)
          .then(function (response) {
            vm.itemId = response.data.itemId
            vm.operateItemMessage = 'Item[' + response.data.name + '] is created.'
            vm.clearData()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      fileChange () {
        const vm = this
        var reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = function () {
          vm.fileBase64 = reader.result
          vm.fileType = vm.file.type
          vm.fileSize = vm.file.size
        }
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
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
            itemId: this.itemId,
            itemType: this.itemType,
            name: this.itemName,
            fileContent: this.fileBase64,
            fileType: this.fileType,
            fileSize: this.fileSize,
            originalFileName: this.file.name,
            eventStartTime: this.eventStart,
            eventEndTime: this.eventEnd,
            involvedPeople: this.getInvolvedPeople(),
            involvedPlaces: this.getInvolvedPlaces(),
            description: this.description,
            sharedTeams: this.sharedTeams
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
      },
      getIntegerValue (value) {
        if (value !== null) {
          return value.toString()
        } else {
          return value
        }
      },
      updateItem () {
        const vm = this
        var config = {
          method: 'PUT',
          baseURL: this.$store.state.domain,
          url: '/item',
          data: this.getAddItemData(),
          headers: {
            'X-Auth-Token': this.$store.state.token
          }
        }
        axios.request(config)
          .then(function (response) {
            vm.operateItemMessage = 'Item[' + response.data.name + '] is updated.'
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      isReadonly () {
        return this.ownerId !== this.$store.state.userInfo.userId
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  .file-select > .select-button {
    padding: 10px;
    color: white;
    background-color: #337ab7;
    border-radius: .3rem;
    text-align: center;
  }

  /* Don't forget to hide the original file input! */
  .file-select > input[type="file"] {
    display: none;
  }
</style>
