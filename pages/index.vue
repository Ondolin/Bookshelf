<template>
  <div>
    <Table />
  </div>
</template>

<script>
  import Table from '../components/Table'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    components: { Table },
  }
</script>
