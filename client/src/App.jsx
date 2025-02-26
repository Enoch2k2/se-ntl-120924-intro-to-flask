import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import Home from './components/static/Home'
import GenreList from './components/genres/GenreList'
import GenreForm from './components/genres/GenreForm'
import GameList from './components/games/GameList'
import GameForm from './components/games/GameForm'
import Signup from './components/sessions/Signup'
import Login from './components/sessions/Login'
import UserDetails from './components/users/UserDetails'

function App() {
  const [ genres, setGenres ] = useState([])
  const [ games, setGames ] = useState([])
  const [ users, setUsers] = useState([])
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function load() {

      async function loadGenres() {
        const resp = await fetch("/api/genres")
        if(resp.status === 200) {
          const data = await resp.json()
          setGenres(data)
        }
      }
  
      async function loadGames() {
        const resp = await fetch("/api/games")
        if(resp.status === 200) {
          const data = await resp.json()
          setGames(data)
        }
      }

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
      
      await loadGenres()
      await loadGames()
      await loadUsers()
      await checkCurrentUser()
      if(loading) {
        setLoading(false)
      }
    }

    load()
  }, [loggedIn])

  const addGenre = genre => {
    setGenres([...genres, genre])
  }

  const addGame = game => {
    setGames([...games, game])
    addGameToGenre(game)
  }
  
  const addGameToGenre = game => {
    const genre = genres.find(genre => genre.id === game.genre.id)
    const updatedGames = [...genre.games, game]
    const updatedGenre = {
      ...genre,
      games: updatedGames
    }
    const updatedGenres = genres.map(genre => {
      if(genre.id === updatedGenre.id ) {
        return updatedGenre
      } else {
        return genre
      }
    })
    setGenres(updatedGenres)
  }

  const addUserGameToGames = userGame => {
    const game = games.find(game => game.id === userGame.game_id)
    let updatedUserGames = [...game.user_games, userGame]
    // update game
    const updatedGame = {
      ...game,
      user_games: updatedUserGames
    }
    // update games state with map
    const updatedGames = games.map(game => {
      if(game.id === updatedGame.id) {
        return updatedGame
      } else {
        return game
      }
    })
    setGames(updatedGames)
  }

  const addUserGameToUser = userGame => {
    updatedUserGames = [...currentUser.user_games, userGame]
    
    const updatedUser = {
      ...currentUser,
      user_games: updatedUserGames
    }
    
    setCurrentUser(updatedUser)
  }

  const addUserGame = userGame => {
    addUserGameToGames(userGame)
    addUserGameToUser(userGame)
  }

  const editUserGameForGame = updatedUserGame => {
    const game = games.find(game => game.id === updatedUserGame.game_id)
    let updatedUserGames = game.user_games.map(userGame => {
      if(userGame.id === updatedUserGame.id) {
        return updatedUserGame
      } else {
        return userGame
      }
    })
    // update game
    const updatedGame = {
      ...game,
      user_games: updatedUserGames
    }
    // update games state with map
    const updatedGames = games.map(game => {
      if(game.id === updatedGame.id) {
        return updatedGame
      } else {
        return game
      }
    })
    setGames(updatedGames)
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

  const editUserGame = userGame => {
    editUserGameForGame(userGame)
    editUserGameForUser(userGame)
  }

  const deleteUserGameForGame = userGame => {
    const game = games.find(game => game.id === userGame.game_id)
    let updatedUserGames = game.user_games.filter(ug => ug.id !== userGame.id)
    // update game
    const updatedGame = {
      ...game,
      user_games: updatedUserGames
    }
    // update games state with map
    const updatedGames = games.map(game => {
      if(game.id === updatedGame.id) {
        return updatedGame
      } else {
        return game
      }
    })
    setGames(updatedGames)
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

  const deleteUserGame = userGame => {
    deleteUserGameForGame(userGame)
    deleteUserGameForUser(userGame)
  }

  const login_user = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout_user = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logout_user={logout_user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenreList genres={genres} />} />
        <Route path="/genres/new" element={<GenreForm addGenre={addGenre} />} />
        <Route path="/games" element={<GameList games={games} currentUser={currentUser} addUserGame={addUserGame} editUserGame={editUserGame} deleteUserGame={deleteUserGame} loggedIn={loggedIn} />} />
        <Route path="/games/new" element={<GameForm genres={ genres } addGame={addGame} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup login_user={login_user} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login login_user={login_user} loggedIn={loggedIn} />} />
        <Route path="/users/:id" element={<UserDetails currentUser={currentUser} loggedIn={loggedIn} users={users} />} />
      </Routes>
    </Router>
  )
}

export default App
