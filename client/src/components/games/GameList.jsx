import React from 'react'
import GameCard from './GameCard'

const GameList = ({ games, currentUser, addUserGame, editUserGame, deleteUserGame }) => {
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