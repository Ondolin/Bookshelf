<template>
  <PopupContainer ref="popupContainer" title="Buch hinzufügen">
    <form @submit.prevent="updateBook" class="text-black">

      <div class="text-white mt-6 select-none text-lg">
        Title:
      </div>
      <input type="text" required class="block w-full rounded px-2 py-1 outline-none" v-model="title">


      <div class="text-white mt-6 select-none text-lg">
        ISBN:
      </div>
      <input type="text" class="block w-full rounded px-2 py-1 outline-none" v-model="isbn">


      <div class="text-white mt-6 select-none text-lg">
        Autor:
      </div>
      <input type="text" class="block w-full rounded px-2 py-1 outline-none" v-model="authors">

      <div class="flex flex-row h-auto mt-6 ">
        <input class="w-11/12 bg-accent rounded px-2 py-1 select-none text-bold hover:bg-accent-light my-1"
               type="submit"/>
        <img src="icon-bin.png" class="w-1/12 h-auto" @click="deleteBook(book)"/>
      </div>
    </form>
  </PopupContainer>
</template>
<script>
import PopupContainer from './PopupContainer'
import { db } from '../../firebase/firebase'
import { books } from '~/firebase/collections'

export default {
  components: { PopupContainer },
  data () {
    return {
      book: {},
      title: '',
      isbn: '',
      authors: ''
    }
  },
  mounted () {
    this.$root.$on('openEditBookPopup', (book) => {
      this.$refs.popupContainer.active = true
      console.log(1)
      this.book = book
      this.title = book.title
      this.isbn = book.isbn13
      this.authors = book.authors
    })
    this.$root.$on('closeEditBookPopup', () => {
      this.$refs.popupContainer.active = false
    })
  },
  methods: {
    async updateBook () {

      console.log(this.book)

      let originalISBN = this.book.isbn13

      let data = {
        authors: this.authors,
        binding: this.book.binding,
        date_published: this.book.date_published,
        image: this.book.image,
        isbn: this.book.isbn,
        isbn13: this.isbn,
        msrp: this.book.msrp,
        publish_date: this.book.publish_date,
        publisher: this.book.publisher,
        title: this.title,
        title_long: this.book.title_long,
      }

      console.info('Edited Book with title ' + data.title + '.');
      if (originalISBN != this.isbn) {
        await books.doc(originalISBN).delete();
      }
      await books.doc(this.isbn).set(data);

      this.book = null

      this.$root.$emit('closeEditBookPopup')

    },
    parseParts (partsString) {
      let partsArray = []
      console.log(partsString)
      partsString = partsString.replace(/\s/g, '')
      partsString = partsString.split(',')
      for (let part of partsString) {
        if (part.includes('-')) {
          let range = part.split('-')
          for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
            partsArray.push(i)
          }
        } else {
          partsArray.push(parseInt(part))
        }
      }
      return partsArray
    },
    parseArray (teile) {
      let out = ''
      for (let i = 0; i < teile.length; i++) {
        if (out !== '') {
          out += ', '
        }
        out += teile[i]
      }
      return out
    },
    deleteBook (book) {
      this.$root.$emit('openConfirmPopup', book)
      this.$root.$emit('closeEditBookPopup')
    }

  }
}
</script>
