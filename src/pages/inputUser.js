import React, { useState } from 'react';
import firebase from '../components/Firebase/firebase';

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
    <form onSubmit={onSubmit}>
      <h4>Registro do Cliente</h4>
      <div>
        <label>Nome:</label>
        <input type='text' value={client} onChange={e => setClient(e.currentTarget.value)} />
      </div>
      <div>
        <label>Mesa:</label>
        <input type='number' value={table} onChange={e => setTable(e.currentTarget.value)} />
      </div>
      <button>Enviar Pedido</button>
    </form>
  )
}

export default Register;