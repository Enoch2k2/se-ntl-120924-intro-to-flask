import { createContext, useContext } from "react";
import { UsersContext } from "./UsersContext";
import { GamesContext } from "./GamesContext";

const UserGamesContext = createContext({})

const UserGamesProvider = ({ children }) => {

  const { addUserGameToUser, editUserGameForUser, deleteUserGameForUser } = useContext(UsersContext)
  const { addUserGameToGames, editUserGameForGame, deleteUserGameForGame } = useContext(GamesContext)

  const addUserGame = userGame => {
    addUserGameToGames(userGame)
    addUserGameToUser(userGame)
  }

  const editUserGame = userGame => {
    editUserGameForGame(userGame)
    editUserGameForUser(userGame)
  }



  const deleteUserGame = userGame => {
    deleteUserGameForGame(userGame)
    deleteUserGameForUser(userGame)
  }

  return <UserGamesContext.Provider value={{ addUserGame, editUserGame, deleteUserGame }}>{ children } </UserGamesContext.Provider>
}

export { UserGamesContext, UserGamesProvider }