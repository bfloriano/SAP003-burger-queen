import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";
import Button from '../components/button';

const styles = StyleSheet.create({
  body: {
    background: 'white',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  btn: {  
    height: '200px',
    width: '280px',
    border: 'none',
    borderRadius: '10px',
    background: '#A61B0F',
    padding: '10px',
    margin: '10px',
    font: 'bolder 30px Arial',
    color: 'rgb(248, 248, 248)',

  },
});

function Home() {
  return (
    <div className={css(styles.body)}>
    <>
      <Button class={css(styles.btn)} title={<Link to="/menu">Menu</Link>} />
      <Button class={css(styles.btn)} title={<Link to="/kitchen">Kitchen</Link>} />
      <Button class={css(styles.btn)} title={<Link to="/delivery">Delivery</Link>} />
    </>
    </div>
  );
}

export default Home