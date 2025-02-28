import { createContext, useState } from "react";

const UsersContext = createContext({})

const UsersProvider = ({ children }) => {
  const [ users, setUsers] = useState([])
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)

  async function loadUsers() {
    const resp = await fetch("/api/users")
    if(resp.status === 200) {
      const data = await resp.json()
      setUsers(data)
    }
  }

  async function checkCurrentUser() {
    const resp = await fetch('/api/check_current_user')
    if(resp.status === 200) {
      const data = await resp.json()
      login_user(data)
    }
  }

  const addUserGameToUser = userGame => {
    updatedUserGames = [...currentUser.user_games, userGame]
    
    const updatedUser = {
      ...currentUser,
      user_games: updatedUserGames
    }
    
    setCurrentUser(updatedUser)
  }

  const editUserGameForUser = updatedUserGame => {
    let updatedUserGames = currentUser.user_games.map(userGame => {
      if(userGame.id === updatedUserGame.id) {
        return updatedUserGame
      } else {
        return userGame
      }
    })
    // update game
    const updatedUser = {
      ...currentUser,
      user_games: updatedUserGames
    }

    setCurrentUser(updatedUser)
  }

  const deleteUserGameForUser = userGame => {
    let updatedUserGames = currentUser.user_games.filter(ug => ug.id !== userGame.id)
    // update game
    const updatedUser = {
      ...currentUser,
      user_games: updatedUserGames
    }

    setCurrentUser(updatedUser)
  }

  const login_user = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout_user = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  return <UsersContext.Provider value={{ users, currentUser, loggedIn, loadUsers, checkCurrentUser, addUserGameToUser, editUserGameForUser, deleteUserGameForUser, login_user, logout_user }}>{ children } </UsersContext.Provider>
}

export { UsersContext, UsersProvider }