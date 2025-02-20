import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import Home from './components/static/Home'
import GenreList from './components/genres/GenreList'
import GenreForm from './components/genres/GenreForm'
import { baseUrl } from './Globals'
import GameList from './components/games/GameList'
import GameForm from './components/games/GameForm'

function App() {
  const [ genres, setGenres ] = useState([])
  const [ games, setGames ] = useState([])

  useEffect(() => {
    async function loadGenres() {
      const resp = await fetch(baseUrl + "/api/genres")
      const data = await resp.json()
      setGenres(data)
    }

    async function loadGames() {
      const resp = await fetch(baseUrl + "/api/games")
      const data = await resp.json()
      setGames(data)
    }

    loadGenres()
    loadGames()
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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenreList genres={genres} />} />
        <Route path="/genres/new" element={<GenreForm addGenre={addGenre} />} />
        <Route path="/games" element={<GameList games={games} />} />
        <Route path="/games/new" element={<GameForm genres={ genres } addGame={addGame} />} />
      </Routes>
    </Router>
  )
}

export default App
