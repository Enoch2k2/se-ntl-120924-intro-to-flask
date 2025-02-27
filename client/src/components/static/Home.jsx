import React from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/signup')
  }

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Game Lister 3000
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover and share your favorite games with the world!
        </Typography>
        <Box mt={4}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Home