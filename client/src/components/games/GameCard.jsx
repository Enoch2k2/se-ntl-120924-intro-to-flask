import React, { useState } from 'react'
import UserGamesForm from '../user_games/UserGamesForm';
import UserGamesEditForm from '../user_games/UserGamesEditForm';

const GameCard = ({ game, currentUser, addUserGame, editUserGame, deleteUserGame }) => {
  let user_game, rating;

  const [editing, setEditing] = useState(false)

  if(currentUser) {
     user_game = game.user_games.find(ug => ug.user_id == currentUser.id)
  }

  const toggleEditForm = event => {
    if(event) {
      event.preventDefault()
    }

    setEditing(!editing)
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    await fetch('/api/user_games/' + user_game.id, { method: "DELETE" })

    deleteUserGame(user_game)
  }

  if(game, currentUser) {
    rating = user_game ? (
      editing ? <><UserGamesEditForm user_game={user_game} editUserGame={editUserGame} toggleEditForm={toggleEditForm} /> - <a href="#" onClick={toggleEditForm}>Cancel</a></> : <>
        <p>Rating: {user_game.rating}</p>
        <p><a href="#" onClick={toggleEditForm}>Edit</a> - <a href="#" onClick={handleDelete}>Delete</a></p>
      </>
    ) : (
      <UserGamesForm currentUserId={currentUser.id} gameId={game.id} addUserGame={addUserGame}  />
    )
  }


  return (
    <div>
      <h3>{ game.title }</h3>
      <p>Genre: { game.genre.name } </p>
      {rating}
    </div>
  )
}

export default GameCard