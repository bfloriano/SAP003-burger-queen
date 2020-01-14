import React, { useState } from 'react';
import firebase from '../Utils/firebase';
import { Redirect } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#FF9A00',
    font: 'bolder 40px Arial',
    textShadow: '1px 1px 1px #B2B2B0',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '75%',
    height: '70px',
    background: '#FFFCFC',
    margin: '10px',
    textAlign: 'center',
    borderRadius: '15px',
    color: '#262525',
    font: 'bolder 14px Arial',
  },
  button: {
    border: 'none',
    borderRadius: '15px',
    outline: 'none',
    width: '30%',
    height: '100px',
    background: '#FF9A00',
    margin: '10px',
    textAlign: 'center',
    color: '#FFFCFC',
    font: 'bolder 34px Arial',
  },
});

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('');

  const loginUser = () => {

    firebase.auth().signInWithEmailAndPassword(email, password).then().catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') { alert('Email inválido') }
      if (errorCode === 'auth/user-disabled') { alert('Usuário desabilitado') }
      if (errorCode === 'auth/user-not-found') { alert('Usuário não encontrado') }
      if (errorCode === 'auth/wrong-password') { alert('Senha incorreta') }
    });
  }

  return (
    <div className={css(styles.page)}>
      <h1 className={css(styles.title)}>Bem vindo ao Burguer Queen</h1>
      <input className={css(styles.input)} type="email" placeholder="E-mail" onChange={e => setEmail(e.currentTarget.value)} />
      <input className={css(styles.input)} type="password" placeholder="Senha" onChange={e => setPassword(e.currentTarget.value)} />

      <button className={css(styles.button)} onClick={loginUser}>Login</button>
      <button className={css(styles.button)} onClick={() => setPage('register')}>Registre-se</button>

      {page === 'register' ? <Redirect to="/register" /> : null}

    </div>
  );
}

export default Login;