import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Nav from './components/nav';
import Menu from './pages/menu';
import Home from './pages/home';
import Kitchen from './pages/kitchen';

import './App.css';

function App() {
  document.title = `Burger Queen`
  
  return (
    <div className='App'>
      <Router>
      <>
        <button class='home-btn'><Link to="/">←</Link></button>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/kitchen" component={Kitchen} />
        </Switch>
      
      </>
      </Router>
    </div>
  );
}

export default App