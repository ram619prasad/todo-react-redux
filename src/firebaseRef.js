import * as firebase from "firebase";


var config = {
    databaseURL: "https://react-burger-app-1c48d.firebaseio.com/",
  };

firebase.initializeApp(config);

const ref = firebase.database().ref().child('todos');

export default ref;