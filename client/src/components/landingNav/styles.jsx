import styled from "styled-components"

export const LandingNavContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
width: ${props => props.click ? "10rem" : "4rem"};
border: 1px solid white;
position: fixed;
top: 5.5rem;
bottom: 0;
transition: all 0.3s ease;
`