import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box } from '@mui/material'

const Signup = ({login_user, loggedIn}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(loggedIn) {
      navigate("/games")
    }
  }, [loggedIn])

  const initialValues = {
    "username": "",
    "password": ""
  }

  const validationSchema = yup.object({
    username: yup.string().min(3).max(25).required(),
    password: yup.string().required()
  })

  const handleSubmit = values => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    }
    fetch("/api/signup", options)
      .then(resp => {
        if(resp.status === 201) {
          resp.json().then(data => login_user(data))
        } else {
          resp.json().then(error => console.log(error))
        }
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Signup