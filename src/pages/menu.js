import React, { useState, useEffect } from 'react';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import Title from '../components/title';

function Menu() {
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [menu, setMenu] = useState();

  // const [resumo, setResumo] = useState([]);

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

  return (
    <>

      <Title class='title-menu' title='Cardápio'/>
      <Button class='option-btn' handleClick={() => setMenu(true)} title='Breakfast'/>
      <Button class='option-btn' handleClick={() => setMenu(false)} title='All Day'/>
  
        {menu ? 
     
          <>
            {itens1.map((item) =>
                <Button class='itens-btn' title={<>
                  <Title class='title-secondary' title={item.name}/>
                  <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                  </>} addtitle='Adicionar'
                />
            )}
          </>

        : 
       
          <>

            <> <Title class='title-primary' title='Hambúrgueres'/>
              {itens2.map((item) => 
                item.type === 'burger' ?
                  <Button class='itens-btn' title={<>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>} addtitle='Adicionar'
                  />

                : false
              )}
            </>

            <> <Title class='title-primary' title='Acompanhamentos'/>
              {itens2.map((item) => 
                item.type === 'acomp' ?
                  <Button class='itens-btn' title={<>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>} addtitle='Adicionar'
                  />

                : false
              )}
            </>

            <> <Title class='title-primary' title='Bebidas'/>
              {itens2.map((item) => 
                item.type === 'drink' ?
                  <Button class='itens-btn' title={<>
                    <Title class='title-secondary' title={item.name}/>
                    <Title class='title-tertiary' title={item.price} addtitle=' reais'/>
                    </>} addtitle='Adicionar'
                  />

                : false
              )}
            </>
          </>
        }
    </>
  )
}

export default Menu;
