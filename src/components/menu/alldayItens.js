import React from 'react';
import CardItem from './cardItens';
import Title from '../title';
import Button from '../button';

const RenderAllDayItens = (props) => {
  return (
    <>
      <Title class='title-primary' title='Hambúrgueres' />
      {props.state.map((item, index) =>
        item.type === 'burger' ?
          <div key={index}>
            <div className='burger-btn'>
              {item.meet.map((op, index) =>
                <span key={index}>
                  <input type="radio" name={item.name} value={op} id={op + item.id}
                    onChange={() => props.setState2(op)} checked={op === props.state2} />{op}
                </span>
              )}
              {item.add.map((adicional, index) =>
                <p key={index}><input type="checkbox" name={item.name} value={adicional} id={adicional + item.id}
                  onChange={() => props.function1(adicional)} checked={props.state3.includes(adicional)}
                />{adicional} + R$ 1,00</p>
              )}
              <Button class='itens-btn' handleClick={() => props.function2(item)} title={
                <>
                  <Title class='title-secondary' title={item.name} />
                  <Title class='title-tertiary' title={item.price} addtitle=' reais' />
                </>} addtitle='Adicionar'
              />
            </div>
          </div>
          : null
      )}
      <Title class='title-primary' title='Acompanhamentos' />
      {props.state.map((item, index) =>
        item.type === 'acomp' ?
          <CardItem
            key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : null
      )}
      <Title class='title-primary' title='Bebidas' />
      {props.state.map((item, index) =>
        item.type === 'drink' ?
          <CardItem
            key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : false
      )}
    </>

  );
}

export default RenderAllDayItens