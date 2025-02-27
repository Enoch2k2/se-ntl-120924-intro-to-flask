import React from 'react'
import GenreCard from './GenreCard'
import { Container, Typography, Box, Divider, Grid } from '@mui/material'

const GenreList = ({ genres }) => {

  const genreCards = genres.map(genre => (
    <Grid item xs={12} sm={6} md={4} key={genre.id}>
      <GenreCard genre={genre} />
    </Grid>
  ))

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Genre List
        </Typography>
        <Divider />
        <Box mt={3}>
          <Grid container spacing={3}>
            {genreCards}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default GenreList