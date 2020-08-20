<template>
  <div>
    <Table />
    <AddBook />
    <ConfirmPopup />
    <EditBook />
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

  export default {
    components: { Table, FloatongActionButton, AddBook, ConfirmPopup, EditBook, Scanner },
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
