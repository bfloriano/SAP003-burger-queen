import React, { useState, useEffect } from 'react';
import firebase from '../Utils/firebase';
import time from './Utils/time';
import conclud from './Utils/concludOrder';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pageTitle: {
    font: 'bolder 36px Arial',
    color: '#FFFCFC',
    textShadow: '1px 1px 1px #B2B2B0',
    textAlign: 'center',
    margin: '5px',
  },
  order: {
    borderRadius: '25px',
    background: '#8C081F',
    color: '#FFFCFC',
    width: '70%',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '15px 15%',
  },
  title: {
    padding: '10px 0px',
    margin: '0px',
    color: '#FF9A00',
    font: 'normal 16px Arial',
    borderBottom: 'solid 1px #FFFCFC',
  },
  bodyItens: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itens: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    font: 'normal 14px Arial',
    textAlign: 'left',
  },
  button: {
    paddingTop: '5px',
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    height: '50px',
    width: '35%',
    background: '#FF9A00',
    color: '#FFFCFC',
    font: 'bolder 14px Arial',
    margin: '10px',
  },
  time: {
    borderTop: 'solid 0.02px white',
    font: 'normal 14px Arial',
    color: '#B2B2B0',
    padding: '10px',
  },
});

function Delivery() {

  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('Orders').orderBy('timeDone', 'asc')
      .onSnapshot((snap) => {
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDelivery(list)
      })
  }, [])

  return (
    <div className={css(styles.flex)}>
      <h1 className={css(styles.pageTitle)}>Pedidos Prontos para a Entrega</h1>
      {delivery.map((item, index) =>
        <div key={index}>

          {item.status === 'toDeliver' ?
            <div className={css(styles.order)}>
              <p className={css(styles.title)}>{'Mesa ' + item.table} - {item.client}</p>
              <div className={css(styles.bodyItens)}>
                <div className={css(styles.itens)}>
                  {item.resumo.map((itens, index) =>
                    <div key={index} >
                      {itens.type === 'burger' ?
                        <>
                          <p>Qtd:{itens.count} - {itens.name}{' /' + itens.meetSelect}</p>
                          { itens.addExtra.length !== 0 ? <p>{' com adicional: ' + itens.addExtra}</p> : null }
                        </>
                        :
                        <p>Qtd:{itens.count} - {itens.name}</p>
                      }
                    </div>
                  )}
                </div>
                <button className={css(styles.button)} onClick={() => conclud(item)}>entregue!</button>
              </div>
              <p className={css(styles.time)}>O pedido ficou pronto em: {time(item)}</p>
            </div>
            : null
          }
        </div>
      )}
    </div>
  );
}

export default Delivery