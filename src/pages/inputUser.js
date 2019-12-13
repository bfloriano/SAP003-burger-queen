import React, { useState } from 'react';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';

const Register = () => {
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    firebase
      .firestore()
      .collection('clients')
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
    <form>
      <p>Preencha os campos abaixo para concluir o pedido</p>
      <div>
        <label>Nome: </label>
        <input type='text' value={client} onChange={e => setClient(e.currentTarget.value)} />
      </div>
      <div>
        <label>Mesa: </label>
        <input type='number' value={table} onChange={e => setTable(e.currentTarget.value)} />
        <Button class="add-btn" handleClick={onSubmit} title="Enviar Pedido"/>
      </div>
      
    </form>
  )
}




export default Register;