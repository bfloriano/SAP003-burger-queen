import React, { useState, useEffect } from 'react';
import firebase from '../components/Firebase/firebase';

function Menu() {
  const [itens, setItens] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('breakfast')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItens(products)
      })
      return () => unsubscribe()
  }, [])

  return itens
}

const ExibeMenu = () => {
  const itens = Menu()

  return (
    <div>
      <h1>Cardápio</h1>
      <h3>Café da Manhã</h3>

      <ol>
        {itens.map((xis) => 
          <div key={xis.id}>
            <div className='xis-entry'> 
              {xis.name}
              <code className='xis'> {xis.price} reais</code>
            </div>
          </div>
        )}
      </ol>
    </div>
  )
}

export default ExibeMenu;

// export default class Menu extends React.Component {
//   render () {
//     return (
//       <div>
//         <h1>Cardápio</h1>
//         <p>{ this.props.title }</p>
//       </div>
//     )
//   }
// }