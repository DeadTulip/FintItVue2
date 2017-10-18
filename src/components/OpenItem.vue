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

      <button class="btn btn-primary" name="btnAdd" @click="addItem" >Add</button>

    </form>
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
        sharedTeamsOptions: ['2', '3'],
        involvedPeople: [],
        involvedPeopleOptions: ['1', '2'],
        additionalPeople: '',
        involvedPlaces: [],
        involvedPlaceOptions: ['1', '2', '3'],
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
        method: 'GET',
        baseURL: this.$store.state.domain,
        url: '/user/' + this.$store.state.userInfo.userId + '/toAddItem',
        headers: {
          'X-Auth-Token': this.$store.state.token
        }
      }
      axios.request(config)
        .then(function (response) {
          this.involvedPeopleOptions = response.data.involvedPeopleOptions
          this.involvedPlacesOptions = response.data.involvedPlacesOptions
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
          data: {
            itemType: this.itemType,
            involvedPeople: this.involvedPeople,
            involvedPlaces: this.involvedPlaces,
            eventStart: this.eventStart,
            eventEnd: this.eventEnd
          },
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
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
