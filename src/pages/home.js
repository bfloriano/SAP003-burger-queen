import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    background: '#262525',
    color: '#F2F3EF',
    height: '100px',
    width: '92%',
    borderRadius: '15px',
    paddingTop: '25px',
    margin: '8px 4%',
    font: 'bolder 50px Arial',
    textAlign: 'center',
  },
});

function Home() {
  return (
    <div className={css(styles.body)}>
      <>
        <Link className={css(styles.link)} to="/menu">Menu</Link>
        <Link className={css(styles.link)} to="/delivery">Delivery</Link>
        <Link className={css(styles.link)} to="/kitchen">Kitchen</Link>
      </>
    </div>
  );
}

export default Home