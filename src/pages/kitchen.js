import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../Utils/firebase';

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
  item: {
    borderBottom: 'solid 0.1px #B2B2B0',
    font: 'normal 20px Arial',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  options: {
    font: 'normal 16px Arial',
  },
  check: {
    height: '30px',
    width: '30px',
  },
  button: {
    border: 'none',
    outline: 'none',
    borderRadius: '15px',
    height: '100px',
    width: '50%',
    background: '#FF9A00',
    color: '#FFFCFC',
    font: 'bolder 44px Arial',
    margin: '10px',
  },
});

function Kitchen() {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('Orders').orderBy('timeSend', 'asc')
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
        timeDone: new Date(),
        timeDateD: new Date().getDate(),
        timeHourD: new Date().getHours(),
        timeMinD: new Date().getMinutes(),
        timeSecD: new Date().getSeconds(),
      })
  }

  return (
    <div className={css(styles.flex)}>
      <h1 className={css(styles.pageTitle)}>Pedidos</h1>
      {order.map((item, index) =>
        <div key={index}>

          {item.status === 'inProgress' ?
            <div className={css(styles.order)}>
              <p className={css(styles.title)}>{' Mesa: ' + item.table}</p>

              {item.resumo.map((products, index) =>
                <div key={index} className={css(styles.item)}>
                  {products.type === 'burger' ?
                    <div>
                      <p>{'Qtd: ' + products.count} - {products.name}</p>
                      <div className={css(styles.options)}>
                        <p>{'Hambúrguer: ' + products.meetSelect}</p>
                        {products.addExtra.length !== 0 ?
                          <p>{'Com adicional: ' + products.addExtra}</p>
                          : null
                        }
                      </div>
                    </div>
                    :
                    <p>{'Qtd: ' + products.count} - {products.name}</p>
                  }
                  <input type="checkbox" className={css(styles.check)} />
                </div>
              )}
              <button className={css(styles.button)} onClick={() => confirm(item)}><span>✔️</span></button>
            </div>
            : null}
        </div>
      )}
    </div>
  );
}

export default Kitchen