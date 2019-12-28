import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from './pages/menu';
import Home from './pages/home';
import Kitchen from './pages/kitchen';
import Delivery from './pages/delivery';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  app: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    background: 'white',
    width: '100%',
    height: '500px',
  },
  btnHome: {
    height: '30px',
    width: '30px',
    border: 'none',
    borderRadius: '10px',
    background: '#A61B0F',
    margin: '5px',
    font: 'bolder 12px Arial',
    color: 'white',
  },
});

function App() {
  document.title = `Burger Queen`
  
  return (
    <div className={css(styles.app)}>
      <Router>
      <>
        <button className={css(styles.btnHome)}><Link to="/">←</Link></button>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/delivery" component={Delivery} />
        </Switch>
      
      </>
      </Router>
    </div>
  );
}

export default App