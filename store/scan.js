import { auth, db } from '../firebase/firebase'

export const state = () => ({
  scans: [],
  scannedBooks: [],
  apiKey: ""
})

export const mutations = {
  addScan (state, scan) {
    state.scans.unshift(scan);
  },
  addBookddBook (state, book) {
    state.scannedBooks.unshift(book);
  },
  setApiKey(state, key) {
    state.apiKey = key;
  }
}

export const actions = {
  async addScan(context, scan) {
    context.commit("addScan", scan);
    let { data } = await this.$axios.get('https://api2.isbndb.com/book/' + scan, {headers: { "Authorization": context.state.apiKey}})
    console.log(data.book)
    context.commit("addBookddBook", data.book)
  },
}
