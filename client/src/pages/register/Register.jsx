import React from 'react'
import { RegisterContainer } from './styles'
import RegisterForm from '../../components/registerForm/RegisterForm'
import { PageHeader } from '../../styles/pageheader'
import { PageHeaderText } from '../../styles/typographies'

function Register() {
  return (
    <RegisterContainer>
      <PageHeader>
        <PageHeaderText>Register</PageHeaderText>
      </PageHeader>
      <RegisterForm/>
    </RegisterContainer>
  )
}

export default Register