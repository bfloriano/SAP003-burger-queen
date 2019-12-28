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
  const [status, setStatus] = useState('andamento');

  useEffect(() => {
    firebase
      .firestore().collection('Orders')
      // .where('status', '==', 'andamento')
      .orderBy('hourSend', 'asc')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
        setOrder((currentState) => [...currentState, doc.data()])
        })
      })

  }, [])

    const confirm = (event) => {
      setStatus('pronto');
      
        // const id = event.currentTarget.dataset.id;
        // .getToken()

        // firebase
        //   .firestore().collection('Orders').doc().update({
        //     status,           
        //     })
      
  }
  


  return (
    <>
      {order.map((item, index) => 
      <div key={index} className={css(styles.order)}>
        <h3>{item.client}</h3><button onClick={() => confirm(item)}>pronto</button>     
        
        {item.resumo.map((products, index) =>
          <div key={index} className={css(styles.item)}>
            <h3>{products.count} - {products.name}</h3>
            <p>{products.meetSelect}</p>
            <p>{products.addExtra}</p>
         
          </div>
        )}
      </div>
      )}   
    </>
  );
}  

export default Kitchen