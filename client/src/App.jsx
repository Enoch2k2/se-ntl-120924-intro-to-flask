import { useEffect, useState, useContext } from 'react'

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
import { Container } from '@mui/material'

import { GenresContext } from './context/GenresContext'
import { GamesContext } from './context/GamesContext'
import { UsersContext } from './context/UsersContext'
import './App.css'

function App() {
  const [ loading, setLoading ] = useState(true)
  
  const { loadGenres } = useContext(GenresContext)
  const { loggedIn, loadUsers, checkCurrentUser } = useContext(UsersContext)
  const { loadGames } = useContext(GamesContext)

  useEffect(() => {
    async function load() {
      
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


  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/new" element={<GenreForm />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/new" element={<GameForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
