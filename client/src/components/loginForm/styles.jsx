import styled from "styled-components"
import { Button } from "../../styles/buttons"
import { Form } from "../../styles/form"

export const LoginFormContainer = styled(Form)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 70%;
height: 62.5%;
`
export const LoginSubmit = styled(Button)`
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