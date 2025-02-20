import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/genres">Genre List</Link></li>
      <li><Link to="/genres/new">Genre Form</Link></li>
      <li><Link to="/games">Game List</Link></li>
      <li><Link to="/games/new">Game Form</Link></li>
    </ul>
  )
}

export default Navbar