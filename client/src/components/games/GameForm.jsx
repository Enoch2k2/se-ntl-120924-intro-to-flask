import React, { useContext, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { TextField, Select, MenuItem, Button, Container, Typography, Box, FormControl } from '@mui/material'
import { GenresContext } from '../../context/GenresContext'
import { GamesContext } from '../../context/GamesContext'
import { UsersContext } from '../../context/UsersContext'

const GameForm = () => {
  const navigate = useNavigate()

  const { genres } = useContext(GenresContext)
  const { addGame } = useContext(GamesContext)
  const { loggedIn } = useContext(UsersContext)
  
  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])
  
  const initialValues = {
    title: "",
    genre_id: genres[0]?.id
  }

  useEffect(() => {
    if (genres.length > 0) {
      formik.setValues({...formik.values, genre_id: genres[0].id})
    }
  }, [genres])

  const validationSchema = yup.object({
    title: yup.string().required(),
    genre_id: yup.number().min(1).required()
  })
  
  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/games", options)
    const data = await resp.json()
    addGame(data)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const genreOptions = genres.map(genre => (
    <MenuItem key={genre.id} value={genre.id}>
      {genre.name}
    </MenuItem>
  ))

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Game
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Select Genre
            </Typography>
            <FormControl fullWidth>
              <Select
                id="genre_id"
                name="genre_id"
                value={formik.values.genre_id}
                onChange={formik.handleChange}
                error={formik.touched.genre_id && Boolean(formik.errors.genre_id)}
              >
                {genreOptions}
              </Select>
              {formik.touched.genre_id && formik.errors.genre_id && (
                <Typography color="error">{formik.errors.genre_id}</Typography>
              )}
            </FormControl>
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Create Game
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default GameForm