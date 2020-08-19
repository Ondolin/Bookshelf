<template>
  <PopupContainer ref="popupContainer" title="Möchtest du dieses Buch wirklich löschen?">
    <div class="flex justify-between">
      <button class="bg-accent rounded w-1/3 mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" @click="confirm">Löschen</button>
      <button class="bg-primary rounded w-1/3 mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" @click="cancel">Abbrechen</button>
    </div>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer'

  export default {
    components: { PopupContainer },
    data() {
      return {
        book: null
      }
    },
    mounted() {
      this.$root.$on("openConfirmPopup", (book) => {
        this.$refs.popupContainer.active = true;
        this.book = book;
      });
      this.$root.$on("closeConfirmPopup", () => {
        this.$refs.popupContainer.active = false;
      });
    },
    methods: {
      confirm() {
        this.$root.$emit('deleteBook', this.book);
        this.$root.$emit('closeConfirmPopup');
        this.book = null;
      },
      cancel() {
        this.$root.$emit('closeConfirmPopup');
      }
    }
  }
</script>
