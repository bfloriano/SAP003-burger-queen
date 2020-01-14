import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import firebase from './Utils/firebase';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import Menu from './pages/menu';
import Delivery from './pages/delivery';
import Kitchen from './pages/kitchen';
import Button from './components/button';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btnHome: {
    borderRadius: '5px',
    background: '#000000',
    color: '#FFFCFC',
    margin: '5px 5%',
    padding: '5px 30px',
    font: 'bolder 20px Arial',
    border: 'none',
    outline: 'none',
  },
  background: {
    background: '#262525',
  },
  align: {
    display: 'flex',
    textAlign: 'right',
    justifyContent: 'space-between',
  },
  alignK: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

function App() {

  document.title = `Burger Queen`
  const [roll, setRoll] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        let uid = user.uid;
        firebase.firestore().collection("users").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.data()["user_uid"] === uid) {
              if (doc.data().occupation === "kitchen") {
                setRoll("kitchen");
              } else if (doc.data().occupation === "waiter") {
                setRoll("waiter");
              }
              console.log(doc.id, " => ", doc.data().occupation);
            }
          });
        });

      } else {
        console.log("nao tem ninguem")
        setRoll("nada");
      }
    });
  }, [])

  const logOut = () => {
    firebase.auth().signOut().then(() => {
      console.log("sucesso")
    }).catch((error) => {
      console.log("error")
    });
  }

  return (
    <div className={css(styles.background)}>
      <Router>
        <>
          <Switch>
            {roll === "kitchen" ?
              (
                <>
                  <div className={css(styles.alignK)}>
                    <Button class={css(styles.btnHome)} handleClick={() => logOut()} title='LogOut' />
                  </div>
                  <Redirect to="/kitchen" />
                  <Route path="/kitchen" component={Kitchen} />
                </>
              ) : ((roll === "waiter") ?
                (
                  <>
                    <div className={css(styles.align)}>
                      <Link className={css(styles.btnHome)} to="/home">←</Link>
                      <Button class={css(styles.btnHome)} handleClick={() => logOut()} title='LogOut' />
                    </div>
                    <Redirect to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/menu" component={Menu} />
                    <Route path="/delivery" component={Delivery} />
                  </>
                ) :
                (
                  <>
                    <Redirect to="/" />
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                  </>
                )
              )
            }
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App