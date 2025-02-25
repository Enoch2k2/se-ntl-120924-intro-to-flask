import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'

const UserGamesEditForm = ({user_game, editUserGame, toggleEditForm}) => {
  const initialValues = {
    rating: user_game.rating,
    user_id: user_game.user_id,
    game_id: user_game.game_id
  }

  const validationSchema = yup.object({
    rating: yup.number().integer().min(1).max(5).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch('/api/user_games/' + user_game.id, options)
    const data = await resp.json()
    editUserGame(data)
    toggleEditForm()
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

export default UserGamesEditForm