import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export const NavbarLink = styled(Link)`
font-size: 1rem;
margin: 2rem 2rem 2rem 0;
color: aliceblue;
position: relative;
text-decoration: none;
cursor: pointer;

&::before {
    content: '';
    height: 2px;
    width: 100%;
    background: linear-gradient(122deg, rgba(73,219,198,1) 0%, rgba(111,45,213,1) 35%, rgba(227,0,255,1) 100%);
    position: absolute;
    bottom: -1px;
    left: 0;
    transform: scale(0, 1);
    transition: all 0.3s ease;
}

&:hover{&::before{transform: scale(1, 1);}}
`
export const LandingNavDescription = styled.span`
overflow: hidden;
color: ${props => props.isSelected ? "yellow" : "#757575"};
margin-left: 1rem;
font-size: 1.15rem;

width: ${props => props.click ? "60%" : "0"};
transition: all ease 0.3s;
`

export const LandingNavCircle = styled.span`
    width: 0.8rem;
    height: 0.8rem;
    background-color: ${props => props.isSelected ? "yellow" : "#757575"};
    border-radius: 50%;
    margin: 0 0.5rem;
    position: relative;

    transition: all ease 0.3s;

    &::before {
        content: '';
        width: 1.2rem;
        height: 1.2rem;
        border: 2px solid yellow;
        border-radius: 50%;
        position: absolute;
        top: -35%;
        left: -35%;
        transform: ${props => props.isSelected ? "scale(1, 1)" : "scale(0, 0)"};
        transition: all ease 0.3s;
    }
`

export const LandingNavLink = styled(AnchorLink) `
font-size: 1rem;
display: flex;
padding-left: 1rem;
flex-direction: row;
justify-content: start;
align-items: center;
text-decoration: none;
margin-bottom: 1rem;
cursor: pointer;
`