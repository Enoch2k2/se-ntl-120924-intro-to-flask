import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = ({ loggedIn, currentUser, logout_user }) => {

  const handleLogout = e => {
    e.preventDefault()

    fetch("/api/logout", { method: "DELETE" })
      .then(resp => logout_user())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Typography>
        {loggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/genres">Genre List</Button>
            <Button color="inherit" component={Link} to="/genres/new">Genre Form</Button>
            <Button color="inherit" component={Link} to="/games">Game List</Button>
            <Button color="inherit" component={Link} to="/games/new">Game Form</Button>
            <Button color="inherit" component={Link} to={`/users/${currentUser.id}`}>{currentUser.username}</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar