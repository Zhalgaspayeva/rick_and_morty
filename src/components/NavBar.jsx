import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/items">Characters</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}