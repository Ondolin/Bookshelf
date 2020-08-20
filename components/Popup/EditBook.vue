<template>
  <PopupContainer ref="popupContainer" title="Buch hinzufügen">
    <form @submit.prevent="updateBook" class="text-black">
      <input type="text" required placeholder="Titel" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="book.title">
      <input type="text" placeholder="ISBN" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="book.isbn">
      <input type="text" required placeholder="1-5, 7" class="block w-full rounded mt-6 px-2 py-1 outline-none" pattern="(((([0-9 ]+)-([0-9 ]+))|([0-9 ]+)),)*((([0-9 ]+)-([0-9 ]+))|([0-9 ]+))" v-model="book.parts">
      <div class="flex flex-row h-auto mt-6 ">
        <input class="w-11/12 bg-accent rounded px-2 py-1 select-none text-bold hover:bg-accent-light my-1" type="submit" />
        <img src="icon-bin.png" class="w-1/12 h-auto" @click="deleteBook(book)" />
      </div>
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
        book: {
          title: null,
          isbn: null,
          parts: null,
          id: null
        }
      }
    },
    mounted() {
      this.$root.$on("openEditBookPopup", (book) => {
        this.$refs.popupContainer.active = true;
        this.book.title = book.title;
        this.book.isbn = book.isbn;
        this.book.parts = this.parseArray(book.parts);
        this.book.id = book.id;
      });
      this.$root.$on("closeEditBookPopup", () => {
        this.$refs.popupContainer.active = false;
      });
    },
    methods: {
      async updateBook () {

        let data = {
          title: this.book.title,
          isbn: this.book.isbn,
          parts: this.parseParts(this.book.parts)
        }

        console.info("Edited Book with title " + data.title + ".");
        await db.collection('books').doc(this.book.id).set(data);

        this.book.title = null;
        this.book.isbn = null;
        this.book.parts = null;

        this.$root.$emit('closeEditBookPopup');

      },
      parseParts(partsString) {
        let partsArray = [];
        console.log(partsString)
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
      },
      parseArray(teile) {
        let out = "";
        for (let i = 0; i < teile.length; i++) {
          if (out !== "") {
            out += ", ";
          }
          out += teile[i];
        }
        return out;
      },
      deleteBook (book) {
        this.$root.$emit('openConfirmPopup', book);
        this.$root.$emit('closeEditBookPopup');
      }

    }
  }
</script>
