import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/home';
import Menu from './pages/menu';
import Delivery from './pages/delivery';
import Kitchen from './pages/kitchen';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btnHome: {
    borderRadius: '5px',
    background: '#262525',
    color: '#F2F3EF',
    margin: '5px 5%',
    padding: '5px 30px',
    font: 'bolder 20px Arial',
  },
});

function App() {
  document.title = `Burger Queen`

  return (
    <>
      <Router>
        <>
          <Link className={css(styles.btnHome)} to="/">←</Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/kitchen" component={Kitchen} />
            <Route path="/delivery" component={Delivery} />
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App