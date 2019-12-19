import React from 'react';
import Title from './title';
import Button from './button';

function Item (props) {
  return (
    <>
      <Button class='itens-btn' handleClick={props.function} title={
        <>
        <Title class='title-secondary' title={props.name}/>
        <Title class='title-tertiary' title={props.price} addtitle=' reais'/>
        </> } addtitle='Adicionar' 
      />
    </>

  );
}

export default Item