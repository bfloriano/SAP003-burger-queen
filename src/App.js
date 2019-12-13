import React, { useState, useEffect } from 'react';
import firebase from './components/Firebase/firebase';
import Menu from './pages/menu';
import Register from './pages/inputUser';

import './App.css';

export default function App() {
  document.title = `Burger Queen`
  

  return (
    <div className="App">
      <div className='menu'>
        <Menu />
      </div>
      <div className='resumo'>
        <Register />
      </div>
    </div>
  );
}

