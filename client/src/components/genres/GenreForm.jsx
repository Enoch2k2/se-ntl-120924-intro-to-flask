import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { GenresContext } from '../../context/GenresContext'

const GenreForm = () => {

  const { addGenre } = useContext(GenresContext)
  
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).required()
  })
  
  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/genres", options)
    const data = await resp.json()
    addGenre(data)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Genre
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Create Genre
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default GenreForm