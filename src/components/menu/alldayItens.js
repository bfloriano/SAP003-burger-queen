import React from 'react';
import CardItem from './cardItens';
import Title from '../title';
import Button from '../button';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  category: {
    font: 'normal 22px Arial',
    color: '#A61B0F',
  },

  box: {
    borderRadius: '10px',
    width: '220px',   
    margin: '10px',
    padding: '5px',
    background: 'rgba(242, 187, 32, 0.1)',
  },

  btnBurger: {
    border: 'solid 1px rgba(242, 187, 32, 0.7)',
    margin: '1px',
    background: 'white',
  },

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

const RenderAllDayItens = (props) => {
  return (
    <>
      <Title class={css(styles.category)} title='Hambúrgueres' />
      <div className={css(styles.flex)}>
      {props.state.map((item, index) =>
        item.type === 'burger' ?
          <div key={index}>
            <div className={css(styles.box)}>
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
              <Button class={css(styles.btnItens)} handleClick={() => props.function2(item)} title={
                <>
                  <Title class={css(styles.title)} title={item.name} />
                  <Title class={css(styles.subTitle)} title={item.price} addtitle=' reais' />
                </>} addtitle='Adicionar'
              />
            </div>
          </div>
          : null
          )}
          </div>
      <Title class={css(styles.category)} title='Acompanhamentos' />
      {props.state.map((item, index) =>
        item.type === 'acomp' ?
          <CardItem
            key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : null
      )}
      <Title class={css(styles.category)} title='Bebidas' />
      {props.state.map((item, index) =>
        item.type === 'drink' ?
          <CardItem
            key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : false
      )}
    </>

  );
}

export default RenderAllDayItens