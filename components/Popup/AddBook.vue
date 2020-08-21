<template>
  <PopupContainer ref="popupContainer" title="Buch hinzufügen">
    <Scanner />
    <form @submit.prevent="addBook" class="text-black">
      <input type="text" required placeholder="Titel" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="title">
      <input type="text" placeholder="ISBN" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="isbn">
      <input type="text" placeholder="Author" class="block w-full rounded mt-6 px-2 py-1 outline-none" v-model="authors">
      <input class="w-full bg-accent rounded mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" type="submit" />
    </form>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer';
  import Scanner from '~/components/Scanner';
  import { db } from '../../firebase/firebase';
  import Quagga from '@ericblade/quagga2'

  export default {
    components: { PopupContainer, Scanner },
    data() {
      return {
        title: null,
        isbn: null,
        authors: null,
        active: false,
      }
    },
    mounted() {
      this.$root.$on("openAddBookPopup", () => {
        this.$refs.popupContainer.active = true;
        this.$store.commit("scan/setSingleScan", true);
      });
      this.$root.$on("closeAddBookPopup", () => {
        this.$refs.popupContainer.active = false;
        this.active = false;
        this.$store.commit("scan/setSingleScan", null);
      });

      this.$root.$on("updateISBN", (isbn) => {
        this.isbn = isbn;
      });

    },
    methods: {
      async addBook () {

        let data = {
          title: this.title,
          isbn13: this.isbn,
          authors: this.authors
        }

        console.info("Add Book with title " + data.title + " to database.");
        await db.collection('books').doc(this.isbn).set(data);

        this.title = null;
        this.isbn = null;
        this.parts = null;

        this.$root.$emit('closeAddBookPopup');

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
      },
      validateISBN(isbn) {
        if (!isbn.match("^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$"))
          return false;

        let sum,
          weight,
          digit,
          check,
          i;

        isbn = isbn.replace(/[^0-9X]/gi, '');

        if (isbn.length != 10 && isbn.length != 13) {
          return false;
        }

        if (isbn.length == 13) {
          sum = 0;
          for (i = 0; i < 12; i++) {
            digit = parseInt(isbn[i]);
            if (i % 2 == 1) {
              sum += 3*digit;
            } else {
              sum += digit;
            }
          }
          check = (10 - (sum % 10)) % 10;
          return (check == isbn[isbn.length-1]);
        }

        if (isbn.length == 10) {
          weight = 10;
          sum = 0;
          for (i = 0; i < 9; i++) {
            digit = parseInt(isbn[i]);
            sum += weight*digit;
            weight--;
          }
          check = 11 - (sum % 11);
          if (check == 10) {
            check = 'X';
          }
          return (check == isbn[isbn.length-1].toUpperCase());
        }
      }
    }
  }
</script>
