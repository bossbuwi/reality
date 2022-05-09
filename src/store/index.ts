import Vue from 'vue'
import Vuex, { Commit } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import auth from './module/auth'
import users from './module/users'
import machines from './module/machines'
import systems from './module/systems'
import events from './module/events'
import calendar from './module/calendar'
import eventtypes from './module/eventtypes'

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false })

export default new Vuex.Store({
  state: {
    error: {
      status: 0,
      error: '',
      message: '',
      timestamp: ''
    }
  },

  getters: {
    getError: (state: any) => state.error,
    getErrorStatus: (state: any) => state.error.status
  },

  mutations: {
    clearError (state: any) {
      const reset = {
        status: 0,
        error: '',
        message: '',
        timestamp: ''
      }
      state.error = reset
    },

    setError (state: any, error: any) {
      state.error = error
    }
  },

  actions: {
    DismissError ({ commit }: { commit: Commit }) {
      commit('clearError')
    }
  },

  modules: {
    auth,
    users,
    machines,
    systems,
    events,
    calendar,
    eventtypes
  },

  plugins: [createPersistedState({
    key: 'theworldiswaiting',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    },
    paths: ['auth.user']
  })]
})
