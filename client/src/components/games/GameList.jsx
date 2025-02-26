import React, { useEffect } from 'react'
import GameCard from './GameCard'
import { useNavigate } from 'react-router-dom'

const GameList = ({ games, currentUser, addUserGame, editUserGame, deleteUserGame, loggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const gameCards = games.map(game => <GameCard key={game.id} game={ game } currentUser={currentUser} addUserGame={addUserGame} editUserGame={editUserGame} deleteUserGame={deleteUserGame} />)

  return (
    <div>
      <h1>Game List</h1>
      <hr />
      { gameCards }
    </div>
  )
}

export default GameList