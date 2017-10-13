<template>
  <div id="openPhysicalItem">
    <div class="form-group">
      <label class="control-label col-sm-2" for="inputItemName">Name:</label>
      <div class="col-sm-6">
        <div>
          <input v-model="itemName" class="form-control" id="inputItemName" name="itemName" />
        </div>
        <div>

        </div>
      </div>

    </div>

    <div class="form-group">
      <label class="control-label col-sm-2" for="inputItemName">Picture:</label>
      <div class="col-sm-6">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OpenPhysicalItem',
    data () {
      return {
        itemName: ''
      }
    }
  }
</script>
