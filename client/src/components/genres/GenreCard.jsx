import React from 'react'
import { Card, CardContent, Typography, List, ListItem } from '@mui/material'

const GenreCard = ({ genre }) => {
  const games = genre.games.map(game => (
    <ListItem key={game.id}>
      {game.title}
    </ListItem>
  ))

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {genre.name}
        </Typography>
        <Typography variant="h6" component="h4">
          Games
        </Typography>
        <List>
          {games}
        </List>
      </CardContent>
    </Card>
  )
}

export default GenreCard