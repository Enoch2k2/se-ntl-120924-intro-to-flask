import React from 'react'
import GameCard from './GameCard'

const GameList = ({ games, currentUser, addUserGame, editUserGame }) => {
  const gameCards = games.map(game => <GameCard key={game.id} game={ game } currentUser={currentUser} addUserGame={addUserGame} editUserGame={editUserGame} />)

  return (
    <div>
      <h1>Game List</h1>
      <hr />
      { gameCards }
    </div>
  )
}

export default GameList