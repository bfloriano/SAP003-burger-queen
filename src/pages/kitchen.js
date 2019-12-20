import React, { useState, useEffect } from 'react';
import firebase from '../Utils/firebase';

function Kitchen() {
  
  const [order, setOrder] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('Orders')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
        setOrder((currentState) => [...currentState, doc.data()])
        })
      })
  }, [])
  
  return (
    <>
      {order.map((item) => 
      <button>
        {/* <h3>{item.option}</h3> */}
        {item.resumo.map((products) =>
        <>
          <h3>Nome: {products.name} </h3>
          <h4>Quantidade: {products.count} </h4>
          <h3>{products.meetSelect}</h3>
          <h3>{products.addExtra}</h3>
          {
            <>
          {/* {(products.type === 'burger') ? <h3>{item.option}</h3> : false} */}
          </>
          }
        </>
        )}
        </button>
       )
      }
          
    </>
  );

}  

export default Kitchen