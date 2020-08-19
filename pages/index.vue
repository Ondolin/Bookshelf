<template>
  <div>
    <div class="columns">
      <div class="column">
        <Table></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from '../components/Table'
  import { getBooks } from '../plugins/API'

  export default {
    components: { Table, },
    methods: {
      getBooksFromAPI() {
        return getBooks().stringify()
      }
    }
  }
</script>
