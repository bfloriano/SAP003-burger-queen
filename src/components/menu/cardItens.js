import React from 'react';
import Title from '../title';
import Button from '../button';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  btnItens: {
    height: '150px',
    width: '180px',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    background: '#8C081F',
    padding: '5px',
    margin: '10px',
    font: 'italic 20px Arial',
    color: '#FF9A00'
  },

  title: {
    font: 'bolder 18px Arial',
    color: '#FFFCFC',
    textAlign: 'center',
    padding: '2px',
  },

  subTitle: {
    font: 'normal 18px Arial',
    color: '#FFFCFC',
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