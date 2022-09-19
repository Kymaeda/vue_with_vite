import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      rate: 1.14,
    };
  },
  mutations: {
    setRate(state, payload) {
      state.rate = payload
    }
  }
})

export default store
