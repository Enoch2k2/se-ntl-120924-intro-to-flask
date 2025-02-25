import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'

const UserGamesForm = ({currentUserId, gameId, addUserGame}) => {
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
      <label htmlFor="rating">Rating: </label>
      <select name="rating" id="rating" value={formik.values.rating} onChange={formik.handleChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default UserGamesForm