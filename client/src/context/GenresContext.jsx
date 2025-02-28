import { createContext, useState } from "react";

const GenresContext = createContext({})

const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([])

  async function loadGenres() {
    const resp = await fetch("/api/genres")
    if(resp.status === 200) {
      const data = await resp.json()
      setGenres(data)
    }
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

  const addGenre = genre => {
    setGenres([...genres, genre])
  }

  return <GenresContext.Provider value={{ genres, addGenre, addGameToGenre, loadGenres }}>{children}</GenresContext.Provider>
}

export { GenresContext, GenresProvider }