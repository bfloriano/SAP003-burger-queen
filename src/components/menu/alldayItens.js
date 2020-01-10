import React from 'react';
import CardItem from './cardItens';
import Title from '../title';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  category: {
    font: 'normal 22px Arial',
    color: '#262525',
  },
  box: {
    borderRadius: '10px',
    width: '200px',
    margin: '10px',
    padding: '5px',
    background: '#F2F3EF',
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
                  <p key={index}>
                    <input type="checkbox" name={item.name} value={adicional} id={adicional + item.id}
                      onChange={() => props.function1(adicional)} checked={props.state3.includes(adicional)} />{adicional} + R$ 1,00
                  </p>
                )}
                <CardItem key={index} function={() => props.function2(item)} name={item.name} price={item.price} />
              </div>
            </div>
            : null
        )}
      </div>

      <Title class={css(styles.category)} title='Acompanhamentos' />
      {props.state.map((item, index) =>
        item.type === 'acomp' ?
          <CardItem key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : null
      )}
      <Title class={css(styles.category)} title='Bebidas' />
      {props.state.map((item, index) =>
        item.type === 'drink' ?
          <CardItem key={index} function={() => props.function3(item)} name={item.name} price={item.price} /> : null
      )}
    </>
  );
}

export default RenderAllDayItens