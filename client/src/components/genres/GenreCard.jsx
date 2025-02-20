import React from 'react'

const GenreCard = ({ genre }) => {
  const games = genre.games.map(game => <li key={game.id}>{ game.title }</li>)

  return (
    <div>
      <h3>{ genre.name }</h3>
      <h4>Games</h4>
      <ul>
        { games }
      </ul>
    </div>
  )
}

export default GenreCard