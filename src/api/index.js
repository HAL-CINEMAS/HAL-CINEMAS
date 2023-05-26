import http from '../utils/request.js'

export const getMovieList = () => {
  return http.get('https://www.fastmock.site/mock/7295ac461fe075c8f9768284084b85a9/api/movieList')
}
