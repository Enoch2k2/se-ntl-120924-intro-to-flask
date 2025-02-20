import React from 'react'

const GameCard = ({ game }) => {
  return (
    <div>
      <h3>{ game.title }</h3>
      <p>Genre: { game.genre.name } </p>
    </div>
  )
}

export default GameCard