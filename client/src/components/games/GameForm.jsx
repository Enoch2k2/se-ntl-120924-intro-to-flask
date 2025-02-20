import * as yup from 'yup'
import { useFormik } from 'formik'
import { baseUrl, headers } from '../../Globals'
import { useEffect } from 'react'

const GameForm = ({ genres, addGame }) => {
  
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
    // fetch to the backend
    // update state
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch(baseUrl + "/api/games", options)
    const data = await resp.json()
    addGame(data)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const genreOptions = genres.map(genre => <option key={ genre.id } value={genre.id}>{genre.name}</option>)

  return (
    <div>
      <h1>Create Genre</h1>
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{formik.errors.title}</p>
        </div>
        <div>
          <label htmlFor="genre_id">Select Genre: </label>
          <select name="genre_id" id="genre_id" value={formik.values.genre_id} onChange={formik.handleChange}>
            {genreOptions}
          </select>
          <p style={{color: "red"}}>{formik.errors.genre_id}</p>
        </div>
        <br />
        <input type="submit" value="Create Game" />
      </form>
    </div>
  )
}

export default GameForm