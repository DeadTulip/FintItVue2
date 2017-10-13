<template>
  <div id="openDiskItem">
    <div class="form-group">
      <label class="control-label col-sm-2">Name: *</label>
      <div class="col-sm-6">
        <input v-model="itemName" class="form-control" name="itemName"/>
        <div class="errors">

        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-sm-2">Type: *</label>
      <div class="col-sm-2">
        <input v-model="fileType" class="form-control" name="fileType" />
      </div>
      <div class="errors">

      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-sm-2">Size: *</label>
      <div class="col-sm-2">
        <input v-model="fileSize" class="form-control" name="fileSize" />
      </div>
      <div class="errors">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OpenDiskItem',
    data () {
      return {
        itemName: '',
        fileType: '',
        fileSize: ''
      }
    }
  }
</script>
