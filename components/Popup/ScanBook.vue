<template>
  <PopupContainer ref="popupContainer" title="Scane ein Buch" :clear-store-after-closing="true">
    <Scanner />
    <div v-for="book in books" class="mt-4 flex justify-between">
      <div>
        {{book.title}}
      </div>
      <div class="flex justify-center items-center ml-6">
        <button class="bg-accent px-3 rounded font-bold" @click="removeBooks(book)">-</button>
      </div>
    </div>
    <button v-if="books.length > 0" class="w-full bg-accent rounded mt-6 px-2 py-1 select-none text-bold hover:bg-accent-light" @click="addAllBooks">Alle hinzufügen</button>
  </PopupContainer>
</template>
<script>
  import PopupContainer from './PopupContainer'
  import { db } from '../../firebase/firebase'
  import Scanner from '../Scanner'
  import { books } from '../../firebase/collections'

  export default {
    components: { PopupContainer, Scanner },
    mounted() {
      this.$root.$on("openScanBookPopup", () => {
        this.$refs.popupContainer.active = true;
        this.$root.$emit('startQuagga');
      });
      this.$root.$on("closeScanBookPopup", () => {
        this.$refs.popupContainer.active = false;
        this.$root.$emit('closeQuagga');
        this.$store.commit('scan/clearStore');
      });
    },
    computed: {
      books() {
        return this.$store.state.scan.scannedBooks;
      }
    },
    methods: {
      addAllBooks() {
        Promise.all(this.books.map((book) => books.doc(book.isbn13).set(book))).then();
        this.$root.$emit('closeScanBookPopup');
        this.$store.commit('scan/clearStore');
      },
      removeBooks(book) {
        this.$store.commit("scan/removeBook", book.isbn13)
      }
    }
  }
</script>
