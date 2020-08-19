<template>
  <div>
    <Table />
    <AddBook />
    <ConfirmPopup />
    <FloatongActionButton />
  </div>
</template>

<script>
  import Table from '../components/Table';
  import FloatongActionButton from '../components/FloatingActionButton'
  import AddBook from '../components/Popup/AddBook'
  import ConfirmPopup from '../components/Popup/ConfirmPopup'

  export default {
    components: { Table, FloatongActionButton, AddBook, ConfirmPopup },
  }
</script>

<style>
  .invert-effect {
    filter: invert(100%);
  }
</style>
