import React, { useState } from 'react'
import FormInput from '../formInput/FormInput'
import { ErrorContainer, RegisterFormContainer, RegisterSubmit, SubmitButtonContainer } from './styles'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Error } from '../../styles/typographies'

function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmation: ""
  })
  const [errorMessage, setErrorMessage] = useState("")
  const {setJWT} = useOutletContext()
  const {setUserName} = useOutletContext()
  const {setId} = useOutletContext()
  const {toggleRefresh} = useOutletContext()
  const navigate = useNavigate()

  const formData = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Username",
      label: "UserName",  
      error: "Username should be 3 - 16 Charachters long",
      pattern: /^[a-zA-Z0-9!§$%&?+#µ~]{3,}$/,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      error: "Invalid Email",
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password", 
      error: "Password should be at least 10 characters long, and must include at least 1 lower and uppercase letter 1 number and one of these special characters (§$%&?!#@µ~-+)",
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-_§&€µ]).{10,}$/, 
    },
    {
      id: 4,
      name: "confirmation",
      type: "password",
      placeholder: "Confirmation",
      label: "Confirmation",
      error: "password does not match",
      pattern: values.password,
    },
  ]

  const onInputChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(values)
    }

    fetch('http://localhost:8080/register', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          setErrorMessage(data.error)
        } else {
          setJWT(data.jwt)
          setUserName(data.account.name)
          setId(data.account.id)
          setErrorMessage("")
          toggleRefresh(true)
          navigate("/home")
        }
      })
      .catch(error => setErrorMessage(error))
  }

  console.log(values)

  return (
    <RegisterFormContainer onSubmit={handleSubmit}>
      <ErrorContainer>
      <Error>{errorMessage}</Error>
      </ErrorContainer>
      {formData.map((data) => (
        <FormInput 
          key={data.id}
          pattern={data.pattern}
          error={data.error}
          {...data} 
          value={values[data.name]}
          onChange={onInputChange}
        />
      ))}
      <SubmitButtonContainer>
        <RegisterSubmit type='submit'>Submit</RegisterSubmit>
      </SubmitButtonContainer>
    </RegisterFormContainer>
  )
}

export default RegisterForm