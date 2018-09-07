import React, {Component} from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="navbar-userscount">{props.counter} users online</span>
    </nav>
  );
}

export default Navbar;