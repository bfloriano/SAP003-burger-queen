import React, { useState } from 'react';
import firebase from '../Utils/firebase';
import { Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',  
  },
});

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');

  const createUser = () => {

    const fireUser = firebase.firestore().collection('users')
    const user = {
      name: name,
      email: email,
      password: password,
      occupation: occupation,

    }
    fireUser.add(user)

    
  }

  return (
    <div className={css(styles.page)}>
      <input type="text" placeholder="Nome" onChange={e => setName(e.currentTarget.value)}/>
      <input type="email" placeholder="E-mail" onChange={e => setEmail(e.currentTarget.value)}/>
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.currentTarget.value)}/>
        <select name="function" onChange={e => setOccupation(e.currentTarget.value)}>
          <option value="none">Selecione a sua função</option>
          <option value="kitchen">Cozinheiro</option>
          <option value="waiter">Garçom</option>
        </select>
      
      {occupation === 'kitchen' ?
      <button onClick={createUser}><Link to="/kitchen">Register</Link></button>
      :
      <button onClick={createUser}><Link to="/">Register</Link></button>     
      }
      
    
    </div>
  );
}

export default Register;