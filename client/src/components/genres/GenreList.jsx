import React from 'react'
import GenreCard from './GenreCard'

const GenreList = ({ genres }) => {

  const genreCards = genres.map(genre => <GenreCard key={genre.id} genre={ genre } />)

  return (
    <div>
      <h1>Genre List</h1>
      <hr />
      { genreCards }
    </div>
  )
}

export default GenreList