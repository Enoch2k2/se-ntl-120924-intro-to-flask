import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ loggedIn, currentUser, logout_user }) => {

  const handleLogout = e => {
    e.preventDefault()

    fetch("/api/logout", { method: "DELETE" })
      .then(resp => logout_user())
  }

  const links = loggedIn ? <>
    <li><Link to="/genres">Genre List</Link></li>
    <li><Link to="/genres/new">Genre Form</Link></li>
    <li><Link to="/games">Game List</Link></li>
    <li><Link to="/games/new">Game Form</Link></li>
    <li>{ currentUser.username }</li>
    <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
  </> : <>
    <li><Link to="/signup">Signup</Link></li>
    <li><Link to="/login">Login</Link></li>
  </>

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      { links }
    </ul>
  )
}

export default Navbar