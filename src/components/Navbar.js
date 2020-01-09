import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";

function Navbar () 
{ return (<div className={styles}>
  <nav>
    <ul>
      <li><Link to='/'>Recipes</Link></li>
      <li><Link to='/create'>Create Recipe Item</Link></li>
      <li><Link to='/peep'>Create Peep</Link></li>
     
    </ul>
  </nav>
</div>

)}


export default Navbar