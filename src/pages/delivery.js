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
      .orderBy('hourDone', 'asc')
      .onSnapshot((snap) => {
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDelivery(list)
      })
  }, [])


  return (
    <div>
      <h2>Pronto para a Entrega</h2>

        {delivery.map((item, index) =>
        <div key={index} className={css(styles.order)}>
          {item.status === 'pronto' ?
            <div>
              <h3>{item.client} - {item.table}</h3>
                {item.resumo.map((itens, index) =>
                  <div key={index}>
                    {itens.type === 'burger' ?
                      <p>{itens.name}{' /' + itens.meetSelect}{' com adicional: ' + itens.addExtra} - Qtd:{itens.count} </p>
                    :
                      <p>{itens.name} - Qtd:{itens.count} </p>}
                  </div> 
                )}
              <button>entregue!</button> 
            </div>
          : null }

        </div>
        )}
          

    </div>
  );
}

export default Delivery