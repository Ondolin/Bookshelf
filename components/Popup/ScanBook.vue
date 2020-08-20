<template>
  <PopupContainer ref="popupContainer" title="Scane ein Buch">
    <Scanner />
    <div v-for="book in books"  class="mt-4">
      {{book.title}}
    </div>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer'
  import { db } from '../../firebase/firebase'
  import Scanner from '../Scanner'

  export default {
    components: { PopupContainer, Scanner },
    mounted() {
      this.$root.$on("openScanBookPopup", () => {
        this.$refs.popupContainer.active = true;
      });
      this.$root.$on("closeScanBookPopup", () => {
        this.$refs.popupContainer.active = false;
      });
    },
    computed: {
      books() {
        return this.$store.state.scan.scannedBooks;
      }
    }
  }
</script>
