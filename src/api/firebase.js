import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API,
  authDomain: process.env.VUE_APP_AUTH,
  projectId: process.env.VUE_APP_PROJECT,
  storageBucket: process.env.VUE_APP_STORAGE,
  messagingSenderId: process.env.VUE_APP_MESSAGE,
  appId: process.env.VUE_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
