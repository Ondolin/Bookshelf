<template>
  <div class="">
    <div class="container mx-auto">
      <div
        class="md:flex flex-row justify-between items-center p-6 pb-2 md:p-0 md:pt-8 animate__animated animate__fadeInDown animate__faster animate__delay-1s">
        <h1 class="text-3xl text-center tracking-wider select-none">Übersicht über alle Bücher</h1>
        <input type="text"
               class="w-full md:w-auto text-black rounded mt-6 md:mt-0 px-2 py-1 transition-all duration-500 border-2 border-primary focus:border-accent hover:border-accent outline-none"
               v-model="searchTerm" placeholder="Search">
      </div>
      <div
        class="md:grid grid-col grid-cols-3 gap-5 mx-6 pb-6 md:m-0 md:mt-8 animate__animated animate__fadeIn animate__faster animate__delay-2s"
        v-if="$store.state.user.user != null">
        <div v-for="book in filteredBooks"
             class="w-full mt-6 md:mt-0 rounded-lg p-6 bg-primary-light shadow-2xl transition-shadow duration-500 hover:shadow-white-2xl relative">
          <img src="icon-edit.png" class="absolute right-0 top-0 w-6 h-6 m-3 invert-effect" @click="editBook(book)">

          <div class="text-2xl font-bold tracking-wide">{{book.title}}</div>
          <div class="w-24 mt-2 h-px bg-accent"/>
          <div class="mt-3 text-xl">{{book.authors}}</div>
          <!--div class="mt-2"><span class="select-none">Verfügbare Teile: </span>{{parseArray(book.parts)}}</div-->
          <div class="mt-2" v-if="book.isbn != null"><span class="select-none">ISBN: </span>{{book.isbn13}}</div>

        </div>
      </div>
      <div v-else class="flex justify-center items-center flex-col h-64 animate__animated animate__fadeIn animate__faster animate__delay-2s">
        <div>
          Um deine Bücher zu sehen, melde dich bitte mit Google an.
        </div>
        <button class="bg-primary-light p-2 px-3 rounded-lg mt-5 shadow-2xl transition-shadow duration-500 hover:shadow-white-2xl" @click="googleSignIn">Google Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import 'animate.css/animate.min.css'
  import { auth, db, GoogleProvider } from '../firebase/firebase'

  export default {
    name: 'Table',
    data () {
      return {
        searchTerm: '',
        editingBook: null
      }
    },
    methods: {
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
      editBook (book) {
        console.log(book)
        this.$root.$emit('openEditBookPopup', book)
      },
      async googleSignIn () {
        this.active = false
        await auth.signInWithPopup(GoogleProvider).then(function () {
        }).catch(e => {
          console.log(e)
        })
      }
    },
    async mounted () {
      this.$root.$on('deleteBook', (book) => {
        console.info('Deleted book with title ' + book.title + '.')
        db.collection('books').doc(book.isbn13).delete()
      })
    }
    ,
    computed: {
      ...
        mapGetters(['books']),
      filteredBooks () {
        return this.books.filter(a => a.title.toUpperCase().includes(this.searchTerm.toUpperCase()) || a.isbn13.toUpperCase().includes(this.searchTerm.toUpperCase()))
      }
    }
    ,
  }
</script>
