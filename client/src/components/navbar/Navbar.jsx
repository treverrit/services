import React from 'react'
import { LeftSide, NavbarDiv, NavbarLinks } from './styles'
import { GradientText } from '../../styles/typographies'
import { NavbarLink } from '../../styles/links'
import { CollapseButton } from '../../styles/buttons'

function Navbar({click, setClick, jwt, handleLogout, name, id, hasSideNav, aboveMobile}) {
  
  return (
    <>
      {aboveMobile ? 
        <NavbarDiv>
          <LeftSide>
            {hasSideNav && (<CollapseButton onClick={() => setClick(!click)} click={click}/>)}
            <GradientText>KBach</GradientText>
          </LeftSide>
          <NavbarLinks>
            {
              jwt !== "" ? (
                <>
                  <NavbarLink to={"/user/:id"}>{name}</NavbarLink>
                  <NavbarLink onClick={handleLogout}>Logout</NavbarLink>
                </>
              ) : (
                <>
                  <NavbarLink to={"/login"}>Login</NavbarLink>
                  <NavbarLink to={"/register"}>Register</NavbarLink>
                </>
              )
            }
            </NavbarLinks>
          </NavbarDiv>
        : (
          <NavbarDiv>
            <GradientText>KBach</GradientText>
            {hasSideNav && (<CollapseButton onClick={() => setClick(!click)} click={click}/>)}
          </NavbarDiv>
        )
      }
    </>
  )
}

export default Navbar