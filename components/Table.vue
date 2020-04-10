<template>
  <div>
    <div class="field">
      <div class="control">
        <input class="input is-primary" type="text" placeholder="Primary input">
      </div>
    </div>
    <table class="table is-h-centerd">
      <thead>
        <tr>
          <th>Name</th>
          <th>Teile</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books">
          <td>{{book.name}}</td>
          <td>{{parseArray(book.teile)}}</td>
          <td>{{book.isbn}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getBooks } from '../plugins/API'

  export default {
    name: 'Table',
    data() {
      return {
        books: ""
      }
    },
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
    created: function () {
      this.books = getBooks()
    }
  }
</script>


<style scoped>
  .is-h-centerd {
    margin: auto;
  }
</style>
