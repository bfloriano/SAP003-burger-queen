import React from 'react';
import CardItem from './cardItens';

const RenderBreakfastItens = (props) => {
  return props.state.map((item, index) =>
    <CardItem
      key={index} function={() => props.function(item)} name={item.name} price={item.price} />
  );
}

export default RenderBreakfastItens