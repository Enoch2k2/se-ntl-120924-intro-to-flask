import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../../context/UsersContext'

const UserDetails = () => {

  const {loggedIn, currentUser, users} = useContext(UsersContext)

  const id = parseInt(useParams().id)
  const navigate = useNavigate()
  const user = users.find(usr => usr.id === id)

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    } else if (user.id !== currentUser.id) {
      navigate("/games")
    }
  }, [loggedIn])

  return (
    <div>
      <h1>{user.username} Profile</h1>
    </div>
  )
}

export default UserDetails