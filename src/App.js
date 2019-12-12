import React, { useState, useEffect } from 'react';
import firebase from './components/Firebase/firebase';
import ExibeMenu from './pages/menu';
import Register from './pages/inputUser';

import './App.css';

export default function App() {
  document.title = `Burger Queen`
  

  return (
    <div className="App">
      <ExibeMenu />
      <Register />
      
    </div>
  );
}

