import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header>
      <h1>movie🎬<font>base</font></h1>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/search'>Search</NavLink></li>
        {/* <li><NavLink to='/'>Dashboard</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li> */}
      </ul>
    </header>
  )
}

export default Header