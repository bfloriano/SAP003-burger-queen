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
    height: '50px',
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

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');    
  const [page, setPage] = useState('');    

  const createUser = () => {
  
    if (name === '' || password === '' || email === '' || occupation === '') {
      alert('Por favor, preencha os campos em branco');
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        const fireUser = firebase.firestore().collection('users')
        const user = {
          name: name,
          email: email,
          password: password,
          occupation: occupation,
          user_uid: firebase.auth().currentUser.uid,
        }
      fireUser.add(user)
      if(occupation === 'kitchen') {
        setPage('kitchen')
      } else if (occupation === 'waiter') {
        setPage('waiter')
      } 

      }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {alert('A senha deve possuir no mínimo 6 caracteres')}
        if (errorCode === 'auth/email-already-in-use') {alert('O e-mail informado já está em uso')}
        if (errorCode === 'auth/operation-not-allowed') {alert('Conta não ativada')}
        if (errorCode === 'auth/invalid-email') {alert('Email inválido')} 
      });
    } 
  }
  
  return (
    <div className={css(styles.page)}>
      <h1 className={css(styles.title)}>Bem vindo ao Burguer Queen</h1>
      <input className={css(styles.input)} type="text" placeholder="Nome" onChange={e => setName(e.currentTarget.value)}/>
      <input className={css(styles.input)} type="email" placeholder="E-mail" onChange={e => setEmail(e.currentTarget.value)}/>
      <input className={css(styles.input)} type="password" placeholder="Senha" onChange={e => setPassword(e.currentTarget.value)}/>
        <select className={css(styles.input)} name="function" onChange={e => setOccupation(e.currentTarget.value)}>
          <option value=''>Selecione a sua função</option>
          <option value="kitchen">Cozinheiro</option>
          <option value="waiter">Garçom</option>
        </select>
      
      <button className={css(styles.button)} onClick={createUser}>Criar conta</button>
      <button className={css(styles.button)} onClick={() => setPage('login')}>Login</button>
      
      {page === 'kitchen' ? <Redirect to="/kitchen"/> : null }
      {page === 'waiter' ? <Redirect to="/home"/> : null }
      {page === 'login' ? <Redirect to="/"/> : null }
  
    </div>
  );
}

export default Register;