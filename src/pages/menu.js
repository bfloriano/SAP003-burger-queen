import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../Utils/firebase';
import RenderBreakfastItens from '../components/menu/breakfastItens';
import RenderAllDayItens from '../components/menu/alldayItens';
import Button from '../components/button';
import Title from '../components/title';
import Input from '../components/input';

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  menu: {
    borderStyle: 'double',
    borderColor: '#262525',
    width: '60%',
    textAlign: 'center',
    margin: '5px',
    marginRight: '1px',
  },

  resumo: {
    borderStyle: 'double',
    borderColor: '#262525',
    width: '40%',
    textAlign: 'center',
    margin: '5px',
    marginLeft: '1px',
    padding: '5px',
  },

  titleMenu: {
    font: 'bolder 36px Arial',
    color: '#262525',
    textShadow: '2px 2px 2px rgb(202, 202, 202)',
  },

  btnCategory: {
    height: '100px',
    width: '180px',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    background: '#262525',
    padding: '10px',
    margin: '10px',
    font: 'bolder 30px Arial',
    color: 'white',
    boxShadow: '3px 3px 5px #262525',
  },

  btnItensResumo: {
    height: '60px',
    width: '270px',
    border: 'none',
    borderRadius: '5px',
    background: '#F2F3EF',
    paddingTop: '3px',
    margin: '5px',
    font: 'normal 13px Arial',
  },

  titleItensResumo: {
    font: 'normal 13px Arial',
    color: 'rgb(0, 0, 0)',
  },

  btnIcon: {
    background: 'transparent',
    boxShadow: '1px 1px 1px #262525',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
  },
  btnIcons: {
    background: 'transparent',
    // boxShadow: '1px 1px 1px #262525',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    marginLeft: '50px',    
  },

  totalResumo: {
    font: 'bold 22px Arial',
    color: '#D93232',
    padding: '20px',
    border: 'double 0.5px rgb(245, 245, 245)',
    background: 'rgba(242, 187, 32, 0.09)',
  },

  input: {
    font: 'normal 12px Arial',
    textAlign: 'center',
    margin: '5px',
    height: '50px',
    outline: 'none',
  },

  inputLabel: {
    font: 'normal 12px Arial',
  },

  btnOrder: {
    height: '100px',
    width: '200px',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    background: '#262525',
    margin: '10px',
    marginTop: '25px',
    font: 'bold 24px Arial',
    color: '#F2F3EF'
      // ':hover': {
      //     color: 'red'
      // },
      // 'focus': {
      //   color: 'blue'
      // },
      // 'active': {
      //   color: 'blue'
      // },
  },

  
  // small: {
  //     '@media (max-width: 600px)': {
  //         backgroundColor: 'red',
  //     }
  // }
});    

function Menu() {
  const [menu, setMenu] = useState();
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [total, setTotal] = useState(0);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [option, setOption] = useState('bovino');
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('menu').where('category', '==', 'breakfast')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          setItens1((currentState) => [...currentState, doc.data()])
        })
      })
    firebase
      .firestore().collection('menu').where('category', '==', 'allday')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          setItens2((currentState) => [...currentState, doc.data()])
        })
      })
  }, [])

  const addItem = (item) => {
    if (!resumo.includes(item)) {
      item.count = 1
      item.addExtra = []
      setResumo([...resumo, item])

    } else {
      item.count += 1
      setResumo([...resumo])
    }
    setTotal(total + (item.price));
  }

  const addBurger = (item) => {
    setResumo([...resumo, { ...item, count: 1, meetSelect: option, addExtra: extra }])
    setOption('bovino')
    setExtra([])
    setTotal(total + (item.price) + (extra.length));
  }

  const handleCheckbox = (adicional) => {
    const index = extra.indexOf(adicional);
    if (index === -1) {
      setExtra([...extra, adicional]);
    } else {
      setExtra(extra.filter(item => item !== adicional))
    }
  }

  const delItem = (item) => {
    const index = resumo.indexOf(item)
    resumo.splice(index, 1)
    setResumo([...resumo])
    const updateTotal = total - (item.price * item.count);
    setTotal(updateTotal)
  }

  const reduceItem = (item) => {
    if (item.count === 1) {
      delItem(item)
    } else {
      item.count -= 1
      setResumo([...resumo])
      const upTotal = total - item.price;
      setTotal(upTotal);
    }
  }

  const sendOrder = (e) => {
    e.preventDefault()

    if (resumo.length && table && client) {
      firebase
        .firestore().collection('Orders').add({
          resumo,
          total,
          client,
          table: parseInt(table),
          timeSend: new Date(),
          timeDateS: new Date().getDate(),
          timeHourS: new Date().getHours(),  
          timeMinS: new Date().getMinutes(),
          timeSecS: new Date().getSeconds(),
          status: 'inProgress',
        })
        .then(() => {
          setResumo([])
          setTotal(0)
          setClient('')
          setTable('')
          alert('Pedido enviado com sucesso')
        })
    }
    else if (!resumo.length) {
      alert('Selecione ao menos um produto para gerar o pedido')
    }
    else if (!table) {
      alert('Por favor, insira o número da mesa')
    }
    else if (!client) {
      alert('Por favor, insira o nome do cliente')
    }
  }

  return (
    <div className={css(styles.body)}>
      <div className={css(styles.menu)}>
        
        <Title class={css(styles.titleMenu)} title='Cardápio' />
        <Button class={css(styles.btnCategory)} handleClick={() => setMenu(true)} title='Breakfast' />
        <Button class={css(styles.btnCategory)} handleClick={() => setMenu(false)} title='All Day' />

        {menu ? <RenderBreakfastItens state={itens1} function={addItem} />
              : <RenderAllDayItens state={itens2} state2={option} setState2={setOption} state3={extra} 
                function1={handleCheckbox} function2={addBurger} function3={addItem} /> }
      </div>

      <div className={css(styles.resumo)}>
        {resumo.map((item, index) =>
          <div key={index} className={css(styles.btnItensResumo)}>
            <Title class={css(styles.titleItensResumo)} title={item.name}
              addtitle={' - valor total: R$ ' + item.count * (item.price + (item.addExtra.length)) + ',00'} />
            Qtd: 
            <Button class={css(styles.btnIcon)} handleClick={() => reduceItem(item)} title=' - ' />{' ' + item.count + ' '}
            <Button class={css(styles.btnIcon)} handleClick={() => addItem(item)} title=' + ' />
            <Button class={css(styles.btnIcons)} handleClick={() => delItem(item)} title='🗑️' />
          </div>
        )}

        <p className={css(styles.totalResumo)}>Valor Total do Pedido: <strong>R$ {total},00</strong></p>
        <p className={css(styles.inputLabel)}>Preencha os campos abaixo para concluir</p>
        <Input class={css(styles.input)} type='text' value={client} holder='Nome do cliente' 
          handleChange={e => setClient(e.currentTarget.value)} />
        <Input class={css(styles.input)} type='number' value={table} holder='Número da mesa'
          handleChange={e => setTable(e.currentTarget.value)} />
        <Button class={css(styles.btnOrder)} handleClick={sendOrder} title="Enviar Pedido" />
      </div>
    </div>
  )
}

export default Menu;

