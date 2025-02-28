import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { FormControl, Select, MenuItem, Button, Grid, Typography } from '@mui/material'
import { UserGamesContext } from '../../context/UserGamesContext'

const UserGamesForm = ({currentUserId, gameId}) => {
  const { addUserGame } = useContext(UserGamesContext)

  const initialValues = {
    rating: 3,
    user_id: currentUserId,
    game_id: gameId
  }

  const validationSchema = yup.object({
    rating: yup.number().integer().min(1).max(5).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch('/api/user_games', options)
    const data = await resp.json()
    addUserGame(data)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">Rating</Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth margin="normal" size="small">
            <Select
              labelId="rating-label"
              id="rating"
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button color="primary" variant="contained" fullWidth type="submit" size="medium" style={{ marginTop: '8px' }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default UserGamesForm