import { auth } from '../firebase/firebase'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
}

export const actions = {
  subscribeUser(context) {
    auth.onAuthStateChanged(async (user) => {
      console.log(context)
      context.commit('setUser', user);

      if (user == null) return;

      try {
        await context.dispatch('bindBooks', null, {root: true})
      } catch (e) {
        console.error(e)
      }
    })
  }
}
