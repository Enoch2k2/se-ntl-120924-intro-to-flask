import React from 'react'
import GameCard from './GameCard'

const GameList = ({ games }) => {
  const gameCards = games.map(game => <GameCard key={game.id} game={ game } />)

  return (
    <div>
      <h1>Game List</h1>
      <hr />
      { gameCards }
    </div>
  )
}

export default GameList