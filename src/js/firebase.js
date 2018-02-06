import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyC529U8G0QzMBoIHsbj0hs0j3cepzbXmBg",
    authDomain: "one-to-one-chat-f2505.firebaseapp.com",
    databaseURL: "https://one-to-one-chat-f2505.firebaseio.com",
    projectId: "one-to-one-chat-f2505",
    storageBucket: "one-to-one-chat-f2505.appspot.com",
    messagingSenderId: "736659700018"
  };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();