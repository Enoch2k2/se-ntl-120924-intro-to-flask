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

function App() {
  const [ genres, setGenres ] = useState([])
  const [ games, setGames ] = useState([])
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)

  useEffect(() => {
    async function loadGenres() {
      const resp = await fetch("/api/genres")
      const data = await resp.json()
      setGenres(data)
    }

    async function loadGames() {
      const resp = await fetch("/api/games")
      const data = await resp.json()
      setGames(data)
    }

    async function checkCurrentUser() {
      fetch('/api/check_current_user')
        .then(resp => {
          if(resp.status === 200) {
            resp.json().then(data => login_user(data))
          }
        })
    }

    loadGenres()
    loadGames()
    checkCurrentUser()

  }, [])

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

  const login_user = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout_user = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logout_user={logout_user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenreList genres={genres} />} />
        <Route path="/genres/new" element={<GenreForm addGenre={addGenre} />} />
        <Route path="/games" element={<GameList games={games} />} />
        <Route path="/games/new" element={<GameForm genres={ genres } addGame={addGame} />} />
        <Route path="/signup" element={<Signup login_user={login_user} />} />
        <Route path="/login" element={<Login login_user={login_user} />} />
      </Routes>
    </Router>
  )
}

export default App
