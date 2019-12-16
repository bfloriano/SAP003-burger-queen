import React from 'react';

function Button(props) {
  return (
    <button className={props.class} onClick={props.handleClick}>{props.title}{props.addtitle}</button>
  )
}

export default Button