import React from 'react';
import { Link } from "react-router-dom";
import Button from '../components/button';

function Home() {


  return (
    <>
      <Button class='category-btn' title={<Link to="/menu">Menu</Link>} />
      <Button class='category-btn' title={<Link to="/kitchen">Kitchen</Link>} />
    </>
  );
}



export default Home