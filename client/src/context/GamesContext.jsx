import { createContext, useContext, useState } from "react";
import { GenresContext } from "./GenresContext";

const GamesContext = createContext({})

const GamesProvider = ({children}) => {
  const [games, setGames] = useState([])

  const { addGameToGenre } = useContext(GenresContext)

  async function loadGames() {
    const resp = await fetch("/api/games")
    if(resp.status === 200) {
      const data = await resp.json()
      setGames(data)
    }
  }

  const addGame = game => {
    setGames([...games, game])
    addGameToGenre(game)
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

  return <GamesContext.Provider value={{ games, loadGames, addGame, addUserGameToGames, editUserGameForGame, deleteUserGameForGame }}>{ children }</GamesContext.Provider>
}

export { GamesContext, GamesProvider }