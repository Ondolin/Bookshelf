<template>
  <PopupContainer ref="popupContainer" :title=buildTitle()>
    <div class="flex justify-between">
      <button class="bg-accent rounded w-1/2 mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light mr-2" @click="confirm">Löschen</button>
      <button class="bg-primary rounded w-1/2 mt-6 px-2 py-1 select-none text-bold hover:bg-popup ml-2" @click="cancel">Abbrechen</button>
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
      },
      buildTitle() {
        if (this.book == null) {
          return "";
        }
        return "Möchtest du " + this.book.title + " wirklich löschen?";
      }
    }
  }
</script>
