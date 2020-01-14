import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";
import firebase from '../Utils/firebase';

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    background: '#000000',
    color: '#FFFCFC',
    height: '100px',
    width: '92%',
    borderRadius: '15px',
    paddingTop: '25px',
    margin: '8px 4%',
    font: 'bolder 50px Arial',
    textAlign: 'center',
  },
});

function Home() {

  const logOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <div className={css(styles.body)}>
      <>
        <Link className={css(styles.link)} to="/menu">Menu</Link>
        <Link className={css(styles.link)} to="/delivery">Delivery</Link>
        <button onClick={logOut}>Sair</button>
      </>
    </div>
  );
}

export default Home