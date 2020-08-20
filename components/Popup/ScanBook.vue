<template>
  <PopupContainer ref="popupContainer" title="Scane ein Buch">
    <Scanner />
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
    }
  }
</script>
