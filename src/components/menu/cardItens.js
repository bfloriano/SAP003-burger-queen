import React from 'react';
import Title from '../title';
import Button from '../button';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btnItens: {
    height: '150px',
    width: '180px',
    border: 'none',
    borderRadius: '10px',
    background: 'rgba(242, 187, 32, 0.7)',
    padding: '5px',
    margin: '10px',
    font: 'italic 20px Arial',
    color: '#A61B0F'
  },

  title: {
    font: 'bolder 18px Arial',
    color: 'rgb(65, 65, 65)',
    textAlign: 'center',
    padding: '2px',
  },

  subTitle: {
    font: 'normal 18px Arial',
    color: 'rgb(65, 65, 65)',
  },

 });

function CardItem (props) {
  return (
      <Button class={css(styles.btnItens)} handleClick={props.function} title={
        <>
        <Title class={css(styles.title)} title={props.name}/>
        <Title class={css(styles.subTitle)} title={props.price} addtitle=' reais'/>
        </> } addtitle='Adicionar' 
      />
  );
}

export default CardItem