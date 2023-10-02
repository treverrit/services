import styled from "styled-components"
//import { NavLink } from "react-router-dom"

export const SidenavContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
width: ${props => props.click ? "16rem" : "4rem"};
border: 1px solid white;
position: fixed;
top: 5.5rem;
bottom: 0;
transition: all 0.3s ease;
`

export const SidebarItems = styled.div`
display: flex;
flex-direction: column;
`

export const SidebarItem = styled.div`
display: flex;
flex-direction: row;
justify-content: left;
align-items: center;
`