<template>
  <div class="fixed right-0 bottom-0 flex flex-col animate__animated animate__fadeInUp animate__delay-1s" v-if="$store.state.user.user != null">
    <ScanBookButton class="m-8 mb-0 mr-6" />
    <AddBookButton class="m-8 mt-6 mr-6 mb-4"/>
  </div>

</template>
<script>
  import AddBookButton from './AddBookButton'
  import ScanBookButton from './ScanBookButton'

  export default {
    components: { AddBookButton, ScanBookButton}
  }
</script>
