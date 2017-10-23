<template>
  <div class="container" id="openItem">
    <h2 v-if="itemId != null">Update {{itemType}} Item</h2>
    <h2 v-else="">Add {{itemType}} Item</h2>

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
      <TextareaField fieldName="Additional people" @input="additionalPeople = arguments[0]"></TextareaField>

      <MultiselectField fieldName="Involved places" :options="involvedPlaceOptions" @input="involvedPlaces = arguments[0]"></MultiselectField>
      <TextareaField fieldName="Additional places" @input="additionalPlaces = arguments[0]"></TextareaField>

      <TextareaField fieldName="Description" @input="description = arguments[0]"></TextareaField>

    </form>
    <button class="btn btn-primary" name="btnAdd" @click="addItem" >Add</button>
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
        itemId: null,
        readonly: false,
        description: '',
        accessibleTeams: [
          'team1', 'team2', 'team3'
        ],
        eventStart: '',
        eventEnd: ''
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
          vm.involvedPeopleOptions = response.data.involvedPeopleOptions
          vm.involvedPlaceOptions = response.data.involvedPlaceOptions
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      addItem () {
        var router = this.$router
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
            router.push('/openDiskItem')
          })
          .catch(function (error) {
            console.log(error)
          })
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
        var ip = []
        ip.concat(this.involvedPeople)
        var apArray = this.getValueArray(this.additionalPeople)
        ip.concat(apArray)
        return ip
      },
      getInvolvedPlaces () {
        var ip = []
        ip.concat(this.involvedPlaces)
        var apArray = this.getValueArray(this.additionalPlaces)
        ip.concat(apArray)
        return ip
      },
      getValueArray (value) {
        var valueArray = value.split(',')
        for (let i = 0; i < valueArray.length; i++) {
          valueArray[i] = valueArray[i].trim()
        }
        return valueArray
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
