import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import './Header.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <header>
      <h1>movie🎬<font>base</font></h1>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/search'>Search</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><button onClick={handleLogin}>Login</button></li>
        <li><button onClick={handleRegister}>Register</button></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </header>
  )
}

export default Header