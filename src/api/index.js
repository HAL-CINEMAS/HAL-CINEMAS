// import http from '../utils/request.js'

// export const getMovieList = () => {
//   return http.get('https://www.fastmock.site/mock/7295ac461fe075c8f9768284084b85a9/api/movieList')
// }

import app from './firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore(app)
async function fetchData() {
  let datalist = []
  const querySnapshot = await getDocs(collection(db, 'movie'))
  querySnapshot.forEach((doc) => {
    datalist = doc.data().data
    const msdata = datalist.seconds * 1000
    const date = new Date(msdata)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}年${month}月${day}日`
    const updatedData = { ...doc.data(), data: formattedDate }
    datalist.push(updatedData)
  })
  return datalist
}

export default fetchData
