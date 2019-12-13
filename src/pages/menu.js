import React, { useState, useEffect } from 'react';
import firebase from '../components/Firebase/firebase';

function Menu() {
  const [itens1, setItens1] = useState([]);
  const [itens2, setItens2] = useState([]);
  const [menu, setMenu] = useState();

  // const [resumo, setResumo] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('menu')
      .where('breakfast', '==', true)
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
          setItens1(products)
        })
    return () => unsubscribe()
      
  }, [])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('menu')
      .where('allday', '==', true) 
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
          setItens2(products)
        })
    return () => unsubscribe()
      
  }, [])


// onClick={() => setResumo([xis])}>
          //   {console.log(resumo)}

  return (
    <div>
      <h1>Cardápio</h1>
      <button className='menu-options' onClick={() => setMenu(true)}>Breakfast</button>
      <button className='menu-options' onClick={() => setMenu(false)}>All Day</button>
       
        {menu ? 

      
        <div>{itens1.map((xis) => 
          <div key={xis.id}> 
          <button className='add-btn'>
          
            <div className='itens'>{xis.name}
            <div className='price-itens'>{xis.price} reais</div> 
            </div> 
          Adicionar
          </button>  
          </div>)};
        </div>

        : 
       
        <div>

        <div><h1>Hambúrgueres</h1>
          {itens2.map((xis) => 
          xis.type === 'burger' ?
          <div key={xis.id}>      
          <button className='add-btn'>
            <div className='itens'>{xis.name}
            <div className='price-itens'>{xis.price} reais</div> 
            </div> 
          Adicionar
          </button>
          </div>
         
          : false
        )}
        </div>


      <div><h1>Bebidas</h1>
        {itens2.map((xis) => 
          xis.type === 'drink' ?
          <div key={xis.id}>      
          <button className='add-btn'>
            <div className='itens'>{xis.name}
            <div className='price-itens'>{xis.price} reais</div> 
            </div> 
          Adicionar
          </button>
          </div>
         
          : false
        )}
      </div>


      <div><h1>Acompanhamentos</h1>
        {itens2.map((xis) => 
          xis.type === 'acomp' ?
          <div key={xis.id}>      
          <button className='add-btn'>
            <div className='itens'>{xis.name}
            <div className='price-itens'>{xis.price} reais</div> 
            </div> 
          Adicionar
          </button>
          </div>
         
          : false
        )}
      </div>
      

      </div>
        
        
        }

        {/* <div>
        {resumo.map((teste) => 
        <div key={teste.id}>      
  
          <div className='itens'>{teste.name}</div>
          </div>
        )}
        </div> */}
    
    </div>
  )
}

export default Menu;
