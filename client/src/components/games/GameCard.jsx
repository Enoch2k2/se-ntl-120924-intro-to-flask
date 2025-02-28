import React, { useContext, useState } from 'react'
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import UserGamesForm from '../user_games/UserGamesForm'
import UserGamesEditForm from '../user_games/UserGamesEditForm'
import { UsersContext } from '../../context/UsersContext'
import { UserGamesContext } from '../../context/UserGamesContext'

const GameCard = ({ game }) => {
  let user_game, rating

  const [editing, setEditing] = useState(false)

  const { currentUser } = useContext(UsersContext)
  const { deleteUserGame } = useContext(UserGamesContext)

  if (currentUser) {
    user_game = game.user_games.find(ug => ug.user_id === currentUser.id)
  }

  const toggleEditForm = event => {
    if (event) {
      event.preventDefault()
    }

    setEditing(!editing)
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    await fetch('/api/user_games/' + user_game.id, { method: "DELETE" })

    deleteUserGame(user_game)
  }

  if (game && currentUser) {
    rating = user_game ? (
      editing ? (
        <>
          <UserGamesEditForm user_game={user_game} toggleEditForm={toggleEditForm} />
          <Button onClick={toggleEditForm}>Cancel</Button>
        </>
      ) : (
        <>
          <Typography variant="body1">Rating: {user_game.rating}</Typography>
          <Box>
            <Button onClick={toggleEditForm}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </Box>
        </>
      )
    ) : (
      <UserGamesForm currentUserId={currentUser.id} gameId={game.id} />
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {game.title}
        </Typography>
        <Typography variant="body1">Genre: {game.genre.name}</Typography>
        {rating}
      </CardContent>
    </Card>
  )
}

export default GameCard