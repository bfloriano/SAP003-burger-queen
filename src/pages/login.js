import React, { useState } from 'react';
import firebase from '../Utils/firebase';
import { Link } from "react-router-dom";
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


  const loginUser = () => {

    
      // e.preventDefault();
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
          firebase.firestore().collection('users').where('occupation', '==', 'kitchen')
            .get().then(() => {
                setPage('kitchen')
            })
            firebase.firestore().collection('users').where('occupation', '==', 'waiter')
            .get().then(() => {
                setPage('waiter')
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
      <button onClick={loginUser}><Link to="/register">Ainda não faz parte do Burger Queen? Registre-se aqui</Link></button>


      {page === 'kitchen' ? <Redirect to="/kitchen"/> : null }
      {page === 'waiter' ? <Redirect to="/home"/> : null }
      {/* {page === 'login' ? <Redirect to="/"/> : null } */}

    </div>
  );
}

export default Login;