import React from 'react';
import CardItem from './cardItens';
import Title from '../title';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  category: {
    font: 'normal 22px Arial',
    color: '#FFFCFC',
  },
  box: {
    borderRadius: '10px',
    width: '190px',
    margin: '10px',
    padding: '5px',
    background: '#8C081F',
    color: '#FFFCFC',
    '@media (max-width: 500px)': {
      margin: '5px',
      padding: '1px',
    }
  },
});

const RenderAllDayItens = (props) => {
  return (
    <>
      <Title class={css(styles.category)} title='Hambúrgueres' />
      <div className={css(styles.flex)}>
        {props.stateItens.map((item, index) =>
          item.type === 'burger' ?
            <div key={index}>
              <div className={css(styles.box)}>
                {item.meet.map((op, index) =>
                  <span key={index}>
                    <input type="radio" name={item.name} value={op} id={op + item.id}
                      onChange={() => props.setStateOption(op)} checked={op === props.stateOption} />{op}
                  </span>
                )}
                {item.add.map((adicional, index) =>
                  <p key={index}>
                    <input type="checkbox" name={item.name} value={adicional} id={adicional + item.id}
                      onChange={() => props.functionCheck(adicional)} checked={props.stateExtra.includes(adicional)} />{adicional} + R$ 1,00
                  </p>
                )}
                <CardItem key={index} function={() => props.functionAddB(item)} name={item.name} price={item.price} />
              </div>
            </div>
            : null
        )}
      </div>

      <Title class={css(styles.category)} title='Acompanhamentos' />
      {props.stateItens.map((item, index) =>
        item.type === 'acomp' ?
          <CardItem key={index} function={() => props.functionAddI(item)} name={item.name} price={item.price} /> : null
      )}
      <Title class={css(styles.category)} title='Bebidas' />
      {props.stateItens.map((item, index) =>
        item.type === 'drink' ?
          <CardItem key={index} function={() => props.functionAddI(item)} name={item.name} price={item.price} /> : null
      )}
    </>
  );
}

export default RenderAllDayItens