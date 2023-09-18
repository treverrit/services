import React from 'react'
import { LeftSide, NavbarDiv, NavbarLinks } from './styles'
import { GradientText } from '../../styles/typographies'
import { NavbarLink } from '../../styles/links'
import { CollapseButton } from '../../styles/buttons'
import { useOutletContext } from 'react-router-dom'

function Navbar({click, setClick, jwt, handleLogout, name, id}) {
  const handleClick = () => setClick(!click)
  
  return (
    <>
      <NavbarDiv>
        <LeftSide>
          <CollapseButton onClick={handleClick} click={click}/>
          <GradientText>KBach</GradientText>
        </LeftSide>
        <NavbarLinks>
          {jwt === "" 
          ? (<>
            <NavbarLink to={"/register"}>Register</NavbarLink>
            <NavbarLink to={"/login"}>Login</NavbarLink>
          </>)
          :(<>
            <NavbarLink to={`/user/${id}`}>{name}</NavbarLink>
            <NavbarLink onClick={handleLogout}>Logout</NavbarLink>
          </>)
          }
        </NavbarLinks>
      </NavbarDiv>
    </>
  )
}

export default Navbar