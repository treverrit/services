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
export const SidebarLink = styled.a`
color: white;
font-size: 1.2rem;
display: flex;
flex-direction: row;
justify-content: left;
align-items: center;
width: 100%;
padding: 0.75rem 0;
cursor: pointer;
transition: all 0.3s ease;

svg {
    padding: 0 1.25rem;
    color: white;
    width: 1.5rem;
    height: 1.5rem;
}

span {
    width: ${props => props.click ? "60%" : "0"};
    margin-left: ${props => props.click ? "1rem" : "0"};
    overflow: hidden;
    transition: all 0.3s ease;
}
`