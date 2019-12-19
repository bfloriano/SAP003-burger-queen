import React from 'react';

function Input(props) {
  return (
    <div className={props.class}>
      <label>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.handleChange} placeholder={props.holder} />{props.name}
    </div>
  )
}

export default Input
