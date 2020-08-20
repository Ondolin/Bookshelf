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
  import { db } from '../firebase/firebase'

  export default {
    components: { Table, FloatongActionButton, AddBook, ConfirmPopup, EditBook, Scanner, ScanBook },
    created () {
      this.$store.dispatch('user/subscribeUser');
      window.addBook = (isbn) => this.$store.dispatch("scan/addScan", isbn);

      db.collection('apiKeys').doc('isbndb').get().then(doc => this.$store.commit("scan/setApiKey", doc.data().key));
    }
  }
</script>

<style>
  .invert-effect {
    filter: invert(100%);
  }
</style>
