import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../Utils/firebase';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  order: {
    borderRadius: '25px',  
    background: 'rgba(242, 187, 32, 0.7)',
    width: '500px',
    // height: '500px',
    textAlign: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    // margin: '5px',
    marginLeft: '100px',
    marginRight: '100px',
  },
  title: {
    // textAlign: 'center',
    // alignSelf: 'center',
    paddingTop: '10px',
    color: '#A61B0F',
    font: 'normal 16px Arial',

  },
  item: {
    borderBottom: 'solid 0.1px white',
    borderTop: 'solid 0.1px white',
    font: 'normal 20px Arial',
    textAlign: 'left',
  },
  button: {
    // justifyContent: 'center',
    border: 'none',
    borderRadius: '25px',
    height: '100px',
    width: '350px',
    background: '#A61B0F',
    color: 'white',
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
      timeDateD: new Date().getDate(),   // dateD: 8,
      timeHourD: new Date().getHours(),
      timeMinD: new Date().getMinutes(),
      timeSecD: new Date().getSeconds(),
    })
    .then(() => {
      console.log('uhul');
    })
  }

  return (
    <div className={css(styles.flex)}>
      <h2>Pedidos</h2>

      {order.map((item, index) => 
      <div key={index}>

      {item.status === 'inProgress' ?
        <div className={css(styles.order)}>

        <h3 className={css(styles.title)}>{item.client}{' Mesa: ' + item.table}</h3>     
            {item.resumo.map((products, index) =>


              <div key={index} className={css(styles.item)}>
                {products.type === 'burger' ?
                <>
                <h3>{'Qtd: ' + products.count} - {products.name}</h3>
                <p>{'Hamburguer: ' + products.meetSelect}</p>
                  {products.addExtra.length !== 0 ?
                    <p>{'Com adicional: ' + products.addExtra}</p>
                    : null
                  }
                </>
                : 
                <h3>{'Qtd: ' + products.count} - {products.name}</h3>
                }
              </div>)}

            <button className={css(styles.button)} onClick={() => confirm(item)}>OK</button> 

        </div>
      : null}

      </div>
      )}   
    </div>
  );
}  

export default Kitchen