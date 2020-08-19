<template>
  <div>
    <Table />
    <AddBook />
    <FloatongActionButton />
  </div>
</template>

<script>
  import Table from '../components/Table';
  import FloatongActionButton from '../components/FloatingActionButton'
  import AddBook from '../components/Popup/AddBook'

  export default {
    components: { Table, FloatongActionButton, AddBook },
  }
</script>

<style>
  .invert-effect {
    filter: invert(100%);
  }
</style>
