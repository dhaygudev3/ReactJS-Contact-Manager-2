import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="container">
         <Link to={'/'} className='navbar-brand'><i className="fa-solid fa-mobile me-3"></i>
         contact <span className='text-warning'>manager</span>
         </Link>
       </div>
      </nav>
    );
  };
export default NavBar