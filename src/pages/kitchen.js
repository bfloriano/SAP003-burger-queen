import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../Utils/firebase';

const styles = StyleSheet.create({
  order: {
    background: 'rgba(242, 187, 32, 0.7)',
    width: '300px',
    textAlign: 'center',
    margin: '5px',
  },
  item: {
    border: 'solid 0.5px white',
  }
});

function Kitchen() {

  const [order, setOrder] = useState([]);
  // const [status, setStatus] = useState('andamento');

  useEffect(() => {
    firebase
      .firestore().collection('Orders')
      .orderBy('hourSend', 'asc')
      .onSnapshot((snap) => {
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setOrder(list)
      })

  }, [])

  const confirm = (item) => {

    
    firebase
    .firestore().collection('Orders').doc(item.id).update({
      status: 'toDeliver',
      hourDone: new Date(),
      hourD: new Date().getHours(),
      minD: new Date().getMinutes(),
      secD: new Date().getSeconds(),
    })
    .then(() => {
      console.log('uhul');
    })
  }

  return (
    <>
      {order.map((item, index) => 
      <div key={index} >
      {item.status === 'inProgress' ?
        <div className={css(styles.order)}>
          <h3>{item.client}</h3>     
            {item.resumo.map((products, index) =>
              <div key={index} className={css(styles.item)}>
                <h3>{products.count} - {products.name}</h3>
                <p>{products.meetSelect}</p>
                <p>{products.addExtra}</p>
              </div>)}
            <button onClick={() => confirm(item)}>pronto</button>     
        </div>
      : null}

      </div>
      )}   
    </>
  );
}  

export default Kitchen