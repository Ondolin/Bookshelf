<template>
  <PopupContainer ref="popupContainer" title="Buch hinzufügen">
    <form @submit.prevent="addBook" class="text-black">
      <input type="text" placeholder="Titel" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="title">
      <input type="text" placeholder="ISBN" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="isbn">
      <input type="text" required placeholder="1-5, 7" class="block w-full rounded mt-6 px-2 py-1 outline-none" pattern="(((([0-9]+)-([0-9]+))|([0-9]+)),)*((([0-9]+)-([0-9]+))|([0-9]+))" v-model="parts">
      <input class="w-full bg-accent rounded mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" type="submit" />
    </form>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer'

  export default {
    components: { PopupContainer },
    data() {
      return {
        title: null,
        isbn: null,
        parts: null
      }
    },
    mounted() {
      this.$root.$on("openAddBookPopup", () => {
        this.$refs.popupContainer.active = true;
      });
    },
    methods: {
      addBook() {

        let tempParts = this.parts.replace(/\s/g, '');

      },
      /*parseParts(partsString) {
        let partsArray = [];
        partsString = partsString.replace(/\s/g, '');
        partsString = partsString.split(",");
        for (let part of partsString) {
          if (part.contains("-")) {
            for (let i = )
          }
        }
      }*/
    }
  }
</script>
