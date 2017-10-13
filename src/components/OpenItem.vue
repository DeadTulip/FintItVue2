<template>
  <div class="container" id="openItem">
    <h2 v-if="itemId != null">Update {{itemType}} Item</h2>
    <h2 v-else="">Add {{itemType}} Item</h2>

    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-2" for="inputSharedTeams">Shared teams:</label>
        <div class="col-sm-8">
          <select class="form-control" id="inputSharedTeams" :disabled="readonly">
            <option v-for="team in accessibleTeams">
              {{team}}
            </option>
          </select>
        </div>
      </div>

      <div v-if="itemType == 'Disk'">
        <OpenDiskItem></OpenDiskItem>
      </div>
      <div v-if="itemType == 'Physical'">
        <OpenPhysicalItem></OpenPhysicalItem>
      </div>


      <div class="form-group">
        <label class="control-label col-sm-2" for="inputEventStart">Event start:</label>
        <div class="col-sm-3" id="eventStartDateContainer">
          <datePicker :date="eventStart" :disabled="readonly"></datePicker>
        </div>
        <div class="errors">

        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2" for="inputEventEnd">Event end:</label>
        <div class="col-sm-3" id="eventEndDateContainer">
          <datePicker :date="eventEnd" :disabled="readonly"></datePicker>
        </div>
        <div class="errors">

        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2" for="inputSelectedPeople">Involved people:</label>
        <div class="col-sm-8">
          <multiselect v-model="involvedPeople" :options="involvedPeopleOptions" :multiple="true"></multiselect>
          <label class="control-label">Additional people:</label>
          <textarea v-model="additionalPeople" class="form-control" id="inputAdditionalPeople" rows="3" name="additionalPeople" :disabled="readonly"/>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2" for="inputSelectedPlaces">Involved places:</label>
        <div class="col-sm-8">
          <multiselect v-model="involvedPlaces" :options="involvedPlacesOptions" :multiple="true"></multiselect>
          <label class="control-label">Additional places:</label>
          <textarea v-model="additionalPlaces" class="form-control" id="inputAdditionalPlaces" rows="3" name="additionalPlaces" :disabled="readonly"/>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2" for="inputDescription">Description:</label>
        <div class="col-sm-8">
          <textarea class="form-control" id="inputDescription" rows="10" name="description" :disabled="readonly"></textarea>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import OpenDiskItem from './OpenDiskItem'
  import OpenPhysicalItem from './OpenPhysicalItem'
  import datePicker from 'vue-datepicker/vue-datepicker-es6.vue'
  import multiselect from 'vue-multiselect'
  export default {
    props: [ 'itemType' ],
    components: {
      OpenDiskItem, OpenPhysicalItem, datePicker, multiselect
    },
    data () {
      return {
        involvedPeople: '',
        involvedPeopleOptions: ['haihan', 'yu', 'sitong'],
        additionalPeople: '',
        involvedPlaces: '',
        involvedPlacesOptions: ['china', 'netherlands', 'changsha'],
        additionalPlaces: '',
        itemId: null,
        readonly: false,
        accessibleTeams: [
          'team1', 'team2', 'team3'
        ],
        eventStart: {
          time: ''
        },
        eventEnd: {
          time: ''
        }
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
