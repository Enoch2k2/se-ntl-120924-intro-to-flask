import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'

const Login = ({login_user, loggedIn}) => {
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
    fetch("/api/login", options)
      .then(resp => {
        if(resp.status === 200) {
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
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{ formik.errors.username }</p>
        </div><br />
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{ formik.errors.password }</p>
        </div><br />

        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default Login