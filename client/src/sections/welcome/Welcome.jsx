import React from 'react'
import { WelcomePicture, WelcomeDecoContainer, WelcomeSectionContainer, WelcomePictureContainer } from './styles'

function Welcome() {
  return (
    <WelcomeSectionContainer id='welcome'>
      <WelcomeDecoContainer>
        <WelcomePictureContainer>
        <WelcomePicture src='https://fastly.picsum.photos/id/76/4912/3264.jpg?hmac=VkFcSa2Rbv0R0ndYnz_FAmw02ON1pPVjuF_iVKbiiV8' alt='affe'/>
        </WelcomePictureContainer>
      </WelcomeDecoContainer>
    </WelcomeSectionContainer>
  )
}

export default Welcome