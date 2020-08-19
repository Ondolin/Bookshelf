import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { books } from '../firebase/collections'

// omitting state, mutations, getters

export const state = () => ({
  books: []
})

export const mutations = {
  ...vuexfireMutations,
  SET_BOOKS_DOCUMENT: (state, booksDocument) => {
    state.books = booksDocument;
  }
}

export const getters = {
  books(state) {
    return state.books
  },
}

export const actions = {
  bindBooks: firestoreAction(async function ({ bindFirestoreRef }) {
    await bindFirestoreRef('books', books, { wait: true })
  }),
  unbindBooks: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('books')
  }),
}
