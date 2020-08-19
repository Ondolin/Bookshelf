<template>
  <div class="">
    <div class="container mx-auto">
      <div class="md:flex flex-row justify-between items-center p-6 pb-2 md:p-0 md:pt-8 animate__animated animate__fadeInDown animate__faster animate__delay-1s">
        <h1 class="text-3xl text-center tracking-wider select-none">Übersicht über alle Bücher</h1>
        <input type="text" class="w-full md:w-auto text-black rounded mt-6 md:mt-0 px-2 py-1 transition-all duration-500 border-2 border-primary focus:border-accent hover:border-accent outline-none" v-model="searchTerm" placeholder="Search">
      </div>
      <div class="md:grid grid-flow-col grid-cols-3 gap-5 mx-6 pb-6 md:m-0 md:mt-8 animate__animated animate__fadeIn animate__faster animate__delay-2s">
        <div v-for="book in filteredBooks" class="w-full mt-6 md:mt-0 rounded-lg p-6 bg-primary-light shadow-2xl transition-shadow duration-500 hover:shadow-white-2xl">
          <div class="text-2xl font-bold tracking-wide">{{book.name}}</div>
          <div class="w-24 mt-2 h-px bg-accent"/>
          <div class="mt-2"><span class="select-none">Verfügbare Teile: </span>{{parseArray(book.teile)}}</div>
          <div class="mt-2"><span class="select-none">ISBN: </span>{{book.isbn}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import "animate.css/animate.min.css";

  export default {
    name: 'Table',
    methods: {
      parseArray(teile) {
        let out = "";
        for (let i = 0; i < teile.length; i++) {
          if (out !== "") {
            out += ", ";
          }
          out += teile[i];
        }
        return out;
      }
    },
    data() {
      return {
        searchTerm: "",
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('bindBooks')
      } catch (e) {
        console.error(e)
      }
    },
    computed: {
      ...mapGetters(['books']),
      filteredBooks() {
        return this.books.filter(a => a.name.toUpperCase().includes(this.searchTerm.toUpperCase()) || a.isbn.toUpperCase().includes(this.searchTerm.toUpperCase()));
      }
    },
  }
</script>
