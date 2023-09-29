import React from 'react'
import { LandingPageContainer } from './styles'
import Welcome from '../../sections/welcome/Welcome'
import About from '../../sections/about/About'
import Usability from '../../sections/usabillity/Usability'
import Products from '../../sections/products/Products'
import ContactUs from '../../sections/contactus/ContactUs'

function Landing() {
  return (
    <LandingPageContainer>
      <Welcome/>
      <About/>
      <Usability/>
      <Products/>
      <ContactUs/>
    </LandingPageContainer>
  )
}

export default Landing