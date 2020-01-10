import React from 'react';

function Input(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input className={props.class} type={props.type} value={props.value} onChange={props.handleChange} placeholder={props.holder} />{props.name}
    </div>
  )
}

export default Input
