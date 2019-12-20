import React, { useState, useEffect } from 'react';
import firebase from '../Utils/firebase';
import Button from '../components/button';
import Title from '../components/title';
import Input from '../components/input';
import Item from '../components/itens';

import './menu.css';

function Menu() {
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [menu, setMenu] = useState();

  useEffect(() => {
    firebase
      .firestore().collection('menu').where('category', '==', 'breakfast')
      .get().then(snapshot => {
        snapshot.forEach(doc => {
        setItens1((currentState) => [...currentState, doc.data()])
        })
      })
  }, [])

  useEffect(() => {
    firebase
      .firestore().collection('menu').where('category', '==', 'allday') 
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          setItens2((currentState) => [...currentState, doc.data()])
          })
        })
    }, [])

  const [resumo, setResumo] = useState([]);
  const [total, setTotal] = useState(0);
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')
  const [option, setOption] = useState('')
  // const [extra, setExtra] = useState([])
  // const [opcionais, setOpcionais] = useState([])

  function sendOrder(e) {
    e.preventDefault()

    if (resumo.length && table && client) {
    firebase
      .firestore().collection('Orders')
      .add({
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
    if(!resumo.includes(item)){
      item.count = 1
      setResumo([...resumo, item])

    } else {
      item.count += 1
      setResumo([...resumo])
    }
    setTotal(total + (item.price));
  }

  const addBurger = (item) => {
      item.count = 1
      // item.addExtra = ([...extra])
      item.meetSelect = option
      setResumo([...resumo, item])
      setOption('')
      // setExtra([])
      
    setTotal(total + (item.price));
  }
  
  const delItem = (item) => {
    const index = resumo.indexOf(item)
      resumo.splice(index, 1)
      setResumo([...resumo])
    const updateTotal = total - (item.price*item.count);
    setTotal(updateTotal)
  }

  const reduceItem = (item) => {
    if(item.count === 1) {
      delItem(item)
    } else {
      item.count -= 1
      setResumo([...resumo])
      const upTotal = total - item.price;
      setTotal(upTotal);
    }
  }

  return (
    <>
      <div className='menu'>
      <Title class='title-menu' title='Cardápio'/>
      <Button class='category-btn' handleClick={() => setMenu(true)} title='Breakfast'/>
      <Button class='category-btn' handleClick={() => setMenu(false)} title='All Day'/>
  
        {menu ? 
          <>
            {itens1.map((item) =>
              <Item function={() => addItem(item)} name={item.name} price={item.price}/>
            )}
          </>
        : 
          <>

            <> <Title class='title-primary' title='Hambúrgueres'/>
              {itens2.map((item) => 
                item.type === 'burger' ?
                <>
                  <button className='burger-btn'>



                    {item.meet.map((op) =>
                      <>
                        <input type="radio" name={item.name} value={op} id={op + item.id} 
                          onClick={() => setOption(op)} />{op}                  
                      </>
                    )}

                    {/* {item.add.map((extra) =>
                      <>
                        <p><input type="checkbox" name={item.name} value={extra} id={extra + item.id}
                          onChange={() => setExtra([extra])} />{extra} + R$ 1,00</p>
                      </>
                    )} */}



                  <Button class='itens-btn' handleClick={() => addBurger(item)} title={
                    <>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </> } addtitle='Adicionar' 
                  />
                  </button>
                </>
                : false
              )}
            </>

            <> <Title class='title-primary' title='Acompanhamentos'/>
              {itens2.map((item) => 
                item.type === 'acomp' ?
                <Item function={() => addItem(item)} name={item.name} price={item.price}/> : false
              )}
            </>

            <> <Title class='title-primary' title='Bebidas'/>
              {itens2.map((item) => 
                item.type === 'drink' ? 
                <Item function={() => addItem(item)} name={item.name} price={item.price}/> : false
              )}
            </>
          </>
        }
      </div>

      <div className='resumo'>
        
        {resumo.map((item) =>
          <div>
            <Button class='resumo-itens-btn' title={
              <>
                <Title class='title-resumo' title={item.name} 
                  addtitle={' - valor total: R$ '+item.price*item.count+',00'}/>
                  Qtd:
                  <Button class='' handleClick={() =>reduceItem(item)} title='-'/>{item.count}  
                  <Button class='' handleClick={() =>addItem(item)} title='+'/>
                  <Button class='' handleClick={() =>delItem(item)} title='Delete'/>
              </>
            }/>
          </div>
        )}

        <p className='total'>Valor Total do Pedido: <strong>{total} reais</strong></p>
        <p>Preencha os campos abaixo para concluir</p>
        <Input class ='input' label='Nome: ' type='text' value={client} 
          handleChange={e => setClient(e.currentTarget.value)} holder='nome do cliente' />
        <Input class ='input' label='Mesa: ' type='number' value={table} 
          handleChange={e => setTable(e.currentTarget.value)} holder='digite o número da mesa' />
        <Button class="order-btn" handleClick={sendOrder} title="Enviar Pedido"/>

      </div>
    </>
  )
}

export default Menu;

