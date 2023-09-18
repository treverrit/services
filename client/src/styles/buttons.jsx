import styled from "styled-components"

export const CollapseButton = styled.button`
background-color: black;
border: none;
height: 2.5rem;
width: 2.5rem;
border-radius: 50%;
margin: 0 0.8rem;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;

&::before, &::after {
    content: '';
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
}

&::before {
    top: ${props => props.click ? "1.2rem":"1rem"};
    transform: ${props => props.click ? "rotate(135deg)":"rotate(0)"};
}
&::after {
    top: ${props => props.click ? "1.2rem":"1.5rem"};
    transform: ${props => props.click ? "rotate(-135deg)":"rotate(0)"};
}

@media screen and (max-width: 800px) {
    width: 2rem;
    height: 2rem;
    &::before, &::after {width: 0.85rem;}
    &::before {top: ${props => props.click ? "0.95rem":"0.75rem"};}
    &::after {top: ${props => props.click ? "0.95rem":"1.25rem"};}
}
`

export const Button = styled.button`
border: none;
background-color: #2cbce9;
color: #010126;
cursor: pointer;
`