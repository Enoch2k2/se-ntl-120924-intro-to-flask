import * as yup from 'yup'
import { useFormik } from 'formik'
import { baseUrl, headers } from '../../Globals'

const GenreForm = ({ addGenre }) => {
  
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).required()
  })
  
  const handleSubmit = async values => {
    // fetch to the backend
    // update state
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch(baseUrl + "/api/genres", options)
    const data = await resp.json()
    addGenre(data)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  console.log('formik errors', formik.errors)

  return (
    <div>
      <h1>Create Genre</h1>
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{formik.errors.name}</p>
        </div>
        <br />
        <input type="submit" value="Create Genre" />
      </form>
    </div>
  )
}

export default GenreForm