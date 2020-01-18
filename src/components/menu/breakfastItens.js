import React from 'react';
import CardItem from './cardItens';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

const RenderBreakfastItens = (props) => {
  return (
    <div className={css(styles.flex)}>
      {props.stateItens.map((item, index) =>
        <CardItem key={index} function={() => props.function(item)} name={item.name} price={item.price} />
      )}
    </div>
  );
}

export default RenderBreakfastItens