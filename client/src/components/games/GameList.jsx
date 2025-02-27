import React, { useEffect } from 'react'
import GameCard from './GameCard'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Divider, Grid } from '@mui/material'

const GameList = ({ games, currentUser, addUserGame, editUserGame, deleteUserGame, loggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const gameCards = games.map(game => (
    <Grid item xs={12} sm={6} md={4} key={game.id}>
      <GameCard game={game} currentUser={currentUser} addUserGame={addUserGame} editUserGame={editUserGame} deleteUserGame={deleteUserGame} />
    </Grid>
  ))

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Game List
        </Typography>
        <Divider />
        <Box mt={3}>
          <Grid container spacing={3}>
            {gameCards}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default GameList