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
    borderColor: '#A61B0F',
    width: '60%',
    textAlign: 'center',
    margin: '5px',
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  resumo: {
    borderStyle: 'double',
    borderColor: '#A61B0F',
    width: '40%',
    textAlign: 'center',
    margin: '5px',
    marginLeft: '0px',
    padding: '5px',
  },

  titleMenu: {
    font: 'bolder 30px Arial',
    color: '#A61B0F',
  },

  btnCategory: {
    height: '100px',
    width: '180px',
    border: 'none',
    borderRadius: '10px',
    background: '#A61B0F',
    padding: '10px',
    margin: '10px',
    font: 'bolder 30px Arial',
    color: '#F2F2F2',
  },

  btnItensResumo: {
    height: '60px',
    width: '350px',
    border: 'none',
    borderRadius: '5px',
    background: 'rgb(226, 223, 181)',
    padding: '0px',
    margin: '5px',
  },

  titleItensResumo: {
    font: 'normal 14px Arial',
    color: 'rgb(0, 0, 0)',
  },

  totalResumo: {
    font: 'bold 20px Arial',
    color: '#A61B0F',
    padding: '20px',
    border: 'double 0.5px rgb(245, 245, 245)',
    background: 'rgba(242, 187, 32, 0.09)',
  },

  input: {
    font: 'normal 16px Arial',
    textAlign: 'right',
    marginRight: '35px',
  },

  btnOrder: {
    height: '100px',
    width: '200px',
    border: 'none',
    borderRadius: '10px',
    background: '#A61B0F',
    margin: '10px',
    marginTop: '25px',
    font: 'bold 24px Arial',
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

        {menu ? <div className={css(styles.flex)}><RenderBreakfastItens state={itens1} function={addItem} /></div>
              : <RenderAllDayItens state={itens2} state2={option} setState2={setOption} state3={extra} 
                function1={handleCheckbox} function2={addBurger} function3={addItem} /> }
      </div>

      <div className={css(styles.resumo)}>
        {resumo.map((item, index) =>
          <div key={index} className={css(styles.btnItensResumo)}>
            <Title class={css(styles.titleItensResumo)} title={item.name}
              addtitle={' - valor total: R$ ' + item.count * (item.price + (item.addExtra.length)) + ',00'} />
            Qtd:
            <Button class='' handleClick={() => reduceItem(item)} title='-' />{item.count}
            <Button class='' handleClick={() => addItem(item)} title='+' />
            <Button class='' handleClick={() => delItem(item)} title='Delete' />
          </div>
        )}

        <p className={css(styles.totalResumo)}>Valor Total do Pedido: <strong>{total} reais</strong></p>
        <p>Preencha os campos abaixo para concluir</p>
        <Input class={css(styles.input)} label='Nome: ' type='text' value={client}
          handleChange={e => setClient(e.currentTarget.value)} holder='nome do cliente' />
        <Input class={css(styles.input)} label='Mesa: ' type='number' value={table}
          handleChange={e => setTable(e.currentTarget.value)} holder='digite o número da mesa' />
        <Button class={css(styles.btnOrder)} handleClick={sendOrder} title="Enviar Pedido" />
      </div>
    </div>
  )
}

export default Menu;

