import styled from 'styled-components'

export const GradientText = styled.h2`
background: linear-gradient(122deg, rgba(73,219,198,1) 0%, rgba(111,45,213,1) 35%, rgba(227,0,255,1) 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 1.8rem;

@media screen and (max-width: 800px) {
    font-size: 1.6rem;
}

@media screen and (max-width: 500px){
    padding-left: 1rem;
}
`

export const PageHeaderText = styled(GradientText)`
margin: 1rem 1rem;
`

export const ErrorMessage = styled.span`
color: #dc4492;
padding: 5px;
display: ${props => props.valid ? "none" : "block"};
font-size: 12px;
`

export const Error = styled.p`
color: #ff1050;
font-size: 14px;
font-weight: 700;
padding: 8px;
border-radius: 1vh;
opacity: 0.5;
display: block;
transition: all ease 0.3s;
`