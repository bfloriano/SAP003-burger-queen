import React, { useState, useEffect } from 'react';
import firebase from '../Utils/firebase';
import Button from '../components/button';
import Title from '../components/title';
import Input from '../components/input';
import RenderBreakfastItens from '../components/menu/breakfastItens';
import RenderAllDayItens from '../components/menu/alldayItens';

import './menu.css';

function Menu() {
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [menu, setMenu] = useState();
  const [resumo, setResumo] = useState([]);
  const [total, setTotal] = useState(0);
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')
  const [option, setOption] = useState('bovino')
  const [extra, setExtra] = useState([])

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

  const sendOrder = (e) => {
    e.preventDefault()

    if (resumo.length && table && client) {
      firebase
        .firestore().collection('Orders').add({
          resumo,
          total,
          client,
          table: parseInt(table),
          dateHour: new Date().toLocaleString('pt-BR')
        })
        .then(() => {
          setResumo([])
          setTotal(0)
          setClient('')
          setTable('')
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

  const handleCheckbox = (adicional) => {
    const index = extra.indexOf(adicional);
    if (index === -1) {
      setExtra([...extra, adicional]);
    } else {
      setExtra(extra.filter(item => item !== adicional))
    }
  }

  return (
    <>
      <div className='menu'>
        <Title class='title-menu' title='Cardápio' />
        <Button class='category-btn' handleClick={() => setMenu(true)} title='Breakfast' />
        <Button class='category-btn' handleClick={() => setMenu(false)} title='All Day' />

        {menu ? <RenderBreakfastItens state={itens1} function={addItem} /> :
          <RenderAllDayItens state={itens2} state2={option} setState2={setOption} state3={extra}
            function1={handleCheckbox} function2={addBurger} function3={addItem} />}
      </div>

      <div className='resumo'>
        {resumo.map((item, index) =>
          <div key={index} className='resumo-itens-btn'>
            <Title class='title-resumo' title={item.name}
              addtitle={' - valor total: R$ ' + item.count * (item.price + (item.addExtra.length)) + ',00'} />
            Qtd:
            <Button class='' handleClick={() => reduceItem(item)} title='-' />{item.count}
            <Button class='' handleClick={() => addItem(item)} title='+' />
            <Button class='' handleClick={() => delItem(item)} title='Delete' />
          </div>
        )}

        <p className='total'>Valor Total do Pedido: <strong>{total} reais</strong></p>
        <p>Preencha os campos abaixo para concluir</p>
        <Input class='input' label='Nome: ' type='text' value={client}
          handleChange={e => setClient(e.currentTarget.value)} holder='nome do cliente' />
        <Input class='input' label='Mesa: ' type='number' value={table}
          handleChange={e => setTable(e.currentTarget.value)} holder='digite o número da mesa' />
        <Button class="order-btn" handleClick={sendOrder} title="Enviar Pedido" />

      </div>
    </>
  )
}

export default Menu;

