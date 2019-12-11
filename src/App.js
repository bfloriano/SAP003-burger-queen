import React from 'react';
import logo from './logo.svg';

import firebase from './components/Firebase/firebase';
import './App.css';

function App() {

  // PARA LER
  // firebase.firestore().collection('user').doc('breakfast')
  // .collection('item').doc('1')
  // .get().then((doc => {
  //   console.log(doc.data());
  // })); 

  firebase.firestore().collection('allDay').doc('item').collection('Hambúrgueres')
  .get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
    });
});
   

    // PARA ADD
    // firebase.firestore().collection("users").add({
    //   first: "Ada",
    //   last: "Lovelace", 
    //   born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  
  );

}

export default App;
