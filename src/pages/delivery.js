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
    margin: '5px',
    marginLeft: '100px',
    marginRight: '100px',
  },
  title: {
    // textAlign: 'center',
    // alignSelf: 'center',
    paddingTop: '5px',
    color: '#A61B0F',
    font: 'normal 16px Arial',
    borderBottom: 'solid 0.02px white',
  },
  bodyItens: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  itens: {
    // borderBottom: 'solid 0.05px white',
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    // borderTop: 'solid 0.02px white',
    font: 'normal 12px Arial',
    textAlign: 'left',
  },
  button: {
    // textAlign: 'right',
    paddingTop: '10px',
    border: 'none',
    borderRadius: '5px',
    height: '50px',
    width: '100px',
    background: '#A61B0F',
    color: 'white',
    font: 'bolder 14px Arial',
    marginLeft: '85px',
    // margin: '5px',

  },
  time: {
    borderTop: 'solid 0.02px white',
    font: 'normal 14px Arial',
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

  const conclud = (item) => {
    firebase
      .firestore().collection('Orders').doc(item.id).update({
        status: 'concluded',
        timeConclud: new Date(),
        timeHourC: new Date().getHours(),
        timeMinC: new Date().getMinutes(),
        timeSecC: new Date().getSeconds(),
      })
      .then(() => {
        console.log('finish');
      })
  }

  const time = (item) => {
    let seconds;
    let rest;

    if (((item.timeDateS)) === ((item.timeDateD))) {
      seconds = (((item.timeHourD * 3600) + (item.timeMinD * 60) + (item.timeSecD)) - ((item.timeHourS * 3600) + (item.timeMinS * 60) + (item.timeSecS)))
    }
    else {
      seconds = (((item.timeHourD * 3600) + (item.timeMinD * 60) + (item.timeSecD) + 86400) - ((item.timeHourS * 3600) + (item.timeMinS * 60) + (item.timeSecS)))
    }

    let horas = Math.floor(seconds / (60 * 60));
    rest = seconds % (60 * 60);

    let minutos = Math.floor(rest / 60);
    rest %= 60;

    let segundos = Math.ceil(rest);

    let hora = [horas + ' h, ', minutos + ' m e ', segundos + ' s.']
    return hora;
  }


  return (
    <div className={css(styles.flex)}>
      <h2>Pedidos Prontos para a Entrega</h2>
      {delivery.map((item, index) =>

        <div key={index} className={css(styles.order)}>
          {item.status === 'toDeliver' ?
            <div>

              <h3 className={css(styles.title)}>{'Mesa ' + item.table} - {item.client}</h3>


              <div className={css(styles.bodyItens)}>

                <div className={css(styles.itens)}>
                  {item.resumo.map((itens, index) =>


                    <div key={index} >

                      {itens.type === 'burger' ?
                        <p>Qtd:{itens.count} - {itens.name}{' /' + itens.meetSelect}{' com adicional: ' + itens.addExtra}</p>
                        :
                        <p>Qtd:{itens.count} - {itens.name}</p>}

                    </div>
                  )}
                </div>

                <button className={css(styles.button)} onClick={() => conclud(item)}>entregue!</button>
              </div>


              <div className={css(styles.time)}>O pedido ficou pronto em: {time(item)}</div>
              {console.log(time(item))}

            </div>
            : null}
        </div>
      )}
    </div>
  );
}

export default Delivery