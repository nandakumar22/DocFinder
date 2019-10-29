import firebase from 'react-native-firebase';

const firebaseConfig = Object.freeze({
  apiKey: 'AIzaSyAiWQ_ae0xV5sGVwDfXC0NLlM36dFzl0jw',
  authDomain: 'docfinder-2b4b3.firebaseapp.com',
  databaseURL: 'https://docfinder-2b4b3.firebaseio.com',
  projectId: 'docfinder-2b4b3',
  storageBucket: 'docfinder-2b4b3.appspot.com',
  messagingSenderId: '449375670631',
  appId: '1:449375670631:web:90d35f8b067e0024b0dfc2',
  measurementId: 'G-QVDS313JYG',
});

firebase.initializeApp(firebaseConfig);
export default firebase;
