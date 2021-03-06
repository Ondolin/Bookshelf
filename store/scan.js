import { auth, db } from '../firebase/firebase'
import { books } from '../firebase/collections'

export const state = () => ({
  scans: [],
  scannedBooks: [],
  apiKey: "",
  singleScan: null
})

export const mutations = {
  addScan (state, scan) {
    state.scans.unshift(scan);
  },
  addBook (state, book) {
    //Stringify author Array
    if (book.authors.length > 1) {
      book.authors = book.authors[1] + " " + book.authors[0];
    } else {
      book.authors = book.authors[0];
    }

    state.scannedBooks.unshift(book);
  },
  setApiKey(state, key) {
    state.apiKey = key;
  },
  removeBook(state, isbn) {
    state.scans = state.scans.filter(scan => scan !== isbn);
    state.scannedBooks = state.scannedBooks.filter(book => book.isbn13 !== isbn);
  },
  clearStore(state) {
    state.scans = [];
    state.scannedBooks = [];
  },
  setSingleScan(state, single) {
    state.singleScan = single;
  }
}

export const actions = {
  async addScan(context, scan) {
    context.commit("addScan", scan);
    let { data } = await this.$axios.get('https://api2.isbndb.com/book/' + scan, {headers: { "Authorization": context.state.apiKey}});

    context.commit("addBook", data.book);
    window.navigator.vibrate(50);
  },
}
