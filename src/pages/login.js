import React, { useState, useEffect } from 'react';
import firebase from '../Utils/firebase';
// import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
// import { useHistory } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Login = () => {

  // let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [occupation, setOccupation] = useState('');
  const [page, setPage] = useState('');    


  // useEffect(() => {
  //     firebase
  //     .firestore().collection('users').where('occupation', '==', 'kitchen')
  //       .get().then(snapshot => {
  //         snapshot.forEach(doc => {
  //           setPage('kitchen')
  //         })
  //       })
  //     firebase
  //       .firestore().collection('users').where('occupation', '==', 'waiter')
  //       .get().then(snapshot => {
  //         snapshot.forEach(doc => {
  //           setPage('waiter')
  //         })
  //       })
  //     }, [])


    const loginUser = () => {
        
      // e.preventDefault();
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("aaaaaaaaaa")
        firebase
      .firestore().collection('users')
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            if(doc.occupation === 'kitchen') {
              setPage('kitchen')
            } else if (doc.occupation === 'waiter') {
              setPage('waiter')
            }
          })
        })
        
  
          }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {alert('Email inválido')}
      if (errorCode === 'auth/user-disabled') {alert('Usuário desabilitado')}
      if (errorCode === 'auth/user-not-found') {alert('Usuário não encontrado')}
      if (errorCode === 'auth/wrong-password') {alert('Senha incorreta')}
    });
  }


  

  return (
    <div className={css(styles.page)}>
      <input type="email" placeholder="E-mail" onChange={e => setEmail(e.currentTarget.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.currentTarget.value)} />

    
      <button onClick={loginUser}>Login</button>
      <button onClick={() => setPage('register')}>Ainda não faz parte do Burger Queen? Registre-se aqui</button>

      {page === 'register' ? <Redirect to="/register"/> : null }
      {page === 'kitchen' ? <Redirect to="/kitchen"/> : null }
      {page === 'waiter' ? <Redirect to="/home"/> : null } 

      {/* {page === 'kitchen' ? <Redirect to="/kitchen"/> : <Redirect to="/home"/> } */}
  
    </div>
  );
}

export default Login;