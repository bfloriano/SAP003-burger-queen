import React from 'react';
import Menu from './pages/menu';
import Register from './pages/inputUser';

import './App.css';

export default function App() {
  document.title = `Burger Queen`
  

  return (
    <div className='App'>
      <div className='menu'>
        <Menu />
      </div>
      <div className='resumo'>
        <Register />
      </div>
    </div>
  );
}

