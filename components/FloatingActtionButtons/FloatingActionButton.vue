<template>
  <div class="fixed right-0 bottom-0 flex flex-col animate__animated animate__fadeInUp animate__delay-1s" v-if="$store.state.user.user != null">
    <ScanBookButton />
    <!--AddBookButton /-->
  </div>

</template>
<script>
  import AddBookButton from './AddBookButton'
  import ScanBookButton from './ScanBookButton'

  export default {
    components: { AddBookButton, ScanBookButton}
  }
</script>
