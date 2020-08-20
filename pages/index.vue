<template>
  <div>
    <Table />
    <AddBook />
    <ConfirmPopup />
    <EditBook />
    <ScanBook />
    <FloatongActionButton />
  </div>
</template>

<script>
  import Table from '../components/Table';
  import FloatongActionButton from '../components/FloatingActtionButtons/FloatingActionButton'
  import AddBook from '../components/Popup/AddBook'
  import ConfirmPopup from '../components/Popup/ConfirmPopup'
  import EditBook from '../components/Popup/EditBook'
  import Scanner from '../components/Scanner'
  import ScanBook from '../components/Popup/ScanBook'

  export default {
    components: { Table, FloatongActionButton, AddBook, ConfirmPopup, EditBook, Scanner, ScanBook },
    created () {
      this.$store.dispatch('user/subscribeUser');
    }
  }
</script>

<style>
  .invert-effect {
    filter: invert(100%);
  }
</style>
