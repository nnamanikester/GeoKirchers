import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyADi6yJ83cMHVEoLs_x4ezENrQuImh9_hA',
  authDomain: 'geo-kirchers.firebaseapp.com',
  databaseURL: 'https://geo-kirchers.firebaseio.com',
  projectId: 'geo-kirchers',
  storageBucket: 'geo-kirchers.appspot.com',
  messagingSenderId: '807499114892',
  appId: '1:807499114892:web:b5ef6dc692c1d16ee58ea9'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
