import React, { useState, useEffect } from 'react';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import Title from '../components/title';
import Input from '../components/input';

function Menu() {
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [menu, setMenu] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore().collection('menu').where('breakfast', '==', true)
      .get().then((snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
          setItens1(products)
        })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore().collection('menu').where('allday', '==', true) 
      .get().then((snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        setItens2(products)
      })
    return () => unsubscribe()
  }, [])

  const [client, setClient] = useState('')
  const [table, setTable] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    firebase
      .firestore().collection('clients')
      .add({
        client, 
        table: parseInt(table)
      })
      .then(() => {
        setClient('')
        setTable('')
      })
  }

  const [resumo, setResumo] = useState([]);
  

  return (
    <>

      <div className='menu'>
      <Title class='title-menu' title='Cardápio'/>
      <Button class='option-btn' handleClick={() => setMenu(true)} title='Breakfast'/>
      <Button class='option-btn' handleClick={() => setMenu(false)} title='All Day'/>
  
        {menu ? 
          <>
            {itens1.map((item) =>
              <Button class='itens-btn' handleClick={() => setResumo([...resumo, item])} title={
                <>
                <Title class='title-secondary' title={item.name}/>
                <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                </>
                } addtitle='Adicionar' 
              />
            )}
          </>

        : 
       
          <>

            <> <Title class='title-primary' title='Hambúrgueres'/>
              {itens2.map((item) => 
                item.type === 'burger' ?
                  <Button class='itens-btn' title={
                    <>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>
                    } addtitle='Adicionar'
                  />
                : false
              )}
            </>

            <> <Title class='title-primary' title='Acompanhamentos'/>
              {itens2.map((item) => 
                item.type === 'acomp' ?
                  <Button class='itens-btn' title={
                    <>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>
                    } addtitle='Adicionar'
                  />
                : false
              )}
            </>

            <> <Title class='title-primary' title='Bebidas'/>
              {itens2.map((item) => 
                item.type === 'drink' ?
                  <Button class='itens-btn' title={
                    <>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>
                    } addtitle='Adicionar'
                  />
                : false
              )}
            </>
          </>
        }
      </div>

      <div div className='resumo'>

          {
            
            resumo.map((item) =>
            // {const del = () => {resumo.reduce(item)} 
            <div>
              <Button class='resumo-itens-btn' title={
                <>
                <Title class='title-resumo' title={item.name} addtitle={' = '+item.price+' reais'}/> 
                {/* <button onClick={() => del}>D</button> */}
                </>
              }/>
          
              {console.log(resumo)}
            </div>
    


  )}

        <p className='total'>Valor Total do Pedido: <strong>{resumo.reduce((total, valor) => total + valor.price, 0)} reais</strong></p>

        <p>Preencha os campos abaixo para concluir</p>
        <Input class ='input' label='Nome: ' type='text' value={client} 
          handleChange={e => setClient(e.currentTarget.value)} holder='nome do cliente' />
        <Input class ='input' label='Mesa: ' type='number' value={table} 
          handleChange={e => setTable(e.currentTarget.value)} holder='digite o número da mesa' />
        <Button class="order-btn" handleClick={onSubmit} title="Enviar Pedido"/>

      </div>
    </>
    
  )
}

export default Menu;

