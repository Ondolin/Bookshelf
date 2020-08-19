<template>
  <PopupContainer ref="popupContainer" title="Buch hinzufügen">
    <form @submit.prevent="addBook" class="text-black">
      <input type="text" required placeholder="Titel" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="title">
      <input type="text" placeholder="ISBN" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="isbn">
      <input type="text" required placeholder="1-5, 7" class="block w-full rounded mt-6 px-2 py-1 outline-none" pattern="(((([0-9 ]+)-([0-9 ]+))|([0-9 ]+)),)*((([0-9 ]+)-([0-9 ]+))|([0-9 ]+))" v-model="parts">
      <input class="w-full bg-accent rounded mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" type="submit" />
    </form>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer'
  import { db } from '../../firebase/firebase'

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
      async addBook () {

        let data = {
          title: this.title,
          isbn: this.isbn,
          parts: this.parseParts(this.parts)
        }

        console.info("Add Book with title " + data.title + " to database.");
        await db.collection('books').doc().set(data);

        this.title = null;
        this.isbn = null;
        this.parts = null;

      },
      parseParts(partsString) {
        let partsArray = [];
        partsString = partsString.replace(/\s/g, '');
        partsString = partsString.split(",");
        for (let part of partsString) {
          if (part.includes("-")) {
            let range = part.split("-");
            for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
              partsArray.push(i);
            }
          } else {
            partsArray.push(parseInt(part))
          }
        }
        return partsArray;
      }
    }
  }
</script>
