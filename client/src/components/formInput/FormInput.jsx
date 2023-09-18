import React, { useState } from 'react'
import { FormInputContainer } from './styles'
import { Input } from '../../styles/inputs'
import { ErrorMessage } from '../../styles/typographies'

function FormInput(props) {
  const {validSubmit, error, pattern, label, onChange, id, ...inputProps} = props
  const [inputLength, setInputLength] = useState(0)
  const [validInput, setValidInput] = useState(false)
  
  const handleChanges = (event) => {
    setInputLength(event.target.value.length)
    onChange(event)
    if (inputProps.name === "confirmation") {
      setValidInput(event.target.value === pattern)
    } else {
      setValidInput(pattern.test(event.target.value) && event.target.value.length !== 0)
    }
  }
    
  return (
    <FormInputContainer>
      <label htmlFor="">{label}</label>
      <Input {...inputProps} onChange={handleChanges}/>
      <ErrorMessage valid={validInput || inputLength === 0}>{error}</ErrorMessage>
    </FormInputContainer>
  )

}

export default FormInput