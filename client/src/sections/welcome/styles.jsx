import styled from 'styled-components'

export const WelcomeSectionContainer = styled.section`
display: flex;
flex-direction: row;
width: 80%;
height: 50%;
border: solid 1px yellow;
margin: 5rem 0;

@media screen and (max-width: 800px) {
    width: 70%;
}

@media screen and (max-width: 650px) {
    width: 60%
}
`

export const WelcomeDecoContainer = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
border: 1px solid wheat;
`

export const WelcomePictureContainer = styled.div`
width: 85%;
height: auto;
position: relative;
&::before {
    content: '';
    width: 100%;
    height: 100%;
    border: 3px solid red;
    position: absolute;
    top: -20%;
    left: -15%;
}
`

export const WelcomePicture = styled.img`
width: 100%;
height: 100%;
position: relative;
`