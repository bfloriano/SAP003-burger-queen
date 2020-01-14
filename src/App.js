import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import Menu from './pages/menu';
import Delivery from './pages/delivery';
import Kitchen from './pages/kitchen';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btnHome: {
    borderRadius: '5px',
    background: '#000000',
    color: '#FFFCFC',
    margin: '5px 5%',
    padding: '5px 30px',
    font: 'bolder 20px Arial',
  },
  background: {
    background: '#262525',
  }
});

function App() {
  document.title = `Burger Queen`

  return (
    <div className={css(styles.background)}>
      <Router>
        <>
          <Link className={css(styles.btnHome)} to="/home">←</Link>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
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