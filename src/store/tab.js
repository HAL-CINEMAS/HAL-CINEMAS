export default {
  state: {
    isCollapse: false,
    movieList: {},
    active: 0,
    registerActive: 0,
    uid: false
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
    },
    useridSave(state, userid) {
      if (userid !== '') {
        state.uid = true
      } else {
        state.uid = false
      }
      console.log(state.uid)
    }
  }
}
