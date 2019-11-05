import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(firestorePlugin );

firebase.initializeApp({
  apiKey: "AIzaSyBFHZMlo15fPJOJ4dmnu2_zmBYAmj1Itao",
  authDomain: "kt-team-feafd.firebaseapp.com",
  databaseURL: "https://kt-team-feafd.firebaseio.com",
  projectId: "kt-team-feafd",
  storageBucket: "kt-team-feafd.appspot.com",
  messagingSenderId: "930851833315",
  appId: "1:930851833315:web:7163183962d9c9b7d04cd6"
});

export default firebase.database();
