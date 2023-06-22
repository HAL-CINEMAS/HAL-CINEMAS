export default {
  state: {
    isCollapse: false,
    movieList: {},
    active: 0,
    registerActive: 0
  },
  mutations: {
    isCollapseChange(state) {
      state.isCollapse = !state.isCollapse
    },
    movieItemChange(state, movie) {
      state.movieList = movie
    },
    activeChange(state, num) {
      state.active = num
    },
    registerActiveChange(state, num) {
      state.registerActive = num
    }
  }
}
