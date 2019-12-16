import React, { useState } from 'react';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import Input from '../components/input';

const Register = () => {
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    firebase
      .firestore().collection('clients')
      .add({
        client, 
        table: parseInt(table)
      })
      .then(() => {
        setClient('')
        setTable('')
      })
  }

  return (
    <>
      <p>Preencha os campos abaixo para concluir o pedido</p>
      <Input class ='input' label='Nome: ' type='text' value={client} 
        handleChange={e => setClient(e.currentTarget.value)} holder='nome do cliente' />
      <Input class ='input' label='Mesa: ' type='number' value={table} 
        handleChange={e => setTable(e.currentTarget.value)} holder='digite o número da mesa' />
      <Button class="order-btn" handleClick={onSubmit} title="Enviar Pedido"/>
    </>
  )
}

export default Register;