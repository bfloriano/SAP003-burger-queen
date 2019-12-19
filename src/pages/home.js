import React from 'react';
import { Link } from "react-router-dom";
import Button from '../components/button';

function Home() {


  return (
    <>
      <Button class='home-btn' title={<Link to="/menu">Menu</Link>} />
      <Button class='home-btn' title={<Link to="/kitchen">Kitchen</Link>} />
    </>
  );
}



export default Home