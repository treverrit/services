import styled from 'styled-components'
import { Link } from 'react-router-dom'

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