import styled from "styled-components"
import { Form } from "../../styles/form"
import { Button } from "../../styles/buttons"

export const RegisterFormContainer = styled(Form)`
height: 100%;
`

export const RegisterSubmit = styled(Button)`
padding: 0.5rem 0;
width: 80%;
margin-top: 1.25rem;
border-radius: 1vh;
font-size: 1rem;
font-weight: 700;
`

export const SubmitButtonContainer = styled.div`
width: 70%;
display: flex;
padding: 0; margin: 0;
justify-content: center;
align-items: center;
`

export const ErrorContainer = styled.div`
width: 70%;
display: flex;
justify-content: left;
align-items: center;
`