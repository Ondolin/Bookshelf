<template>
  <div>
    <Navbar></Navbar>
    <div class="columns">
      <div class="column">
        <Table></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '../components/Table'
  import Navbar from '../components/Navbar'
  import { getBooks } from '../plugins/API'

  export default {
    components: { Table, Navbar },
    methods: {
      getBooksFromAPI() {
        return getBooks().stringify()
      }
    }
  }
</script>
