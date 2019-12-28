import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../Utils/firebase';

const styles = StyleSheet.create({
  order: {
    background: 'rgba(242, 187, 32, 0.7)',
    width: '300px',
    textAlign: 'center',
  },
  item: {
    border: 'solid 0.5px white',
  }
});

function Delivery() {

  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('Orders')
      // .where('status', '==', 'pronto')
      .orderBy('hourDone', 'asc')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          setDelivery((currentState) => [...currentState, doc.data()])
        })
      })
  }, [])


  return (
    <div>
      <h2>Pronto para a Entrega</h2>
      {delivery.map((item, index) =>
        <div key={index} className={css(styles.order)}>
          <h3>{item.client} - {item.table}<button>entregue!</button></h3>
          {item.resumo.map((itens, index) =>
            <div key={index}>
              {itens.type === 'burger' ?
                <p>{itens.name}{' /' + itens.meetSelect}{' com adicional: ' + itens.addExtra} - Qtd:{itens.count} </p>
                :
                <p>{itens.name} - Qtd:{itens.count} </p>
              }

            </div>
          )}
        </div>)}

    </div>
  );
}

export default Delivery