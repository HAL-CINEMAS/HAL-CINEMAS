export default {
  state: {
    isCollapse: false,
    movieList: {}
  },
  mutations: {
    isCollapseChange(state) {
      state.isCollapse = !state.isCollapse
    },
    movieItemChange(state, movie) {
      state.movieList = movie
    }
  }
}
