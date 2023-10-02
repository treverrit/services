import React from 'react'
import { MobileNavContainer, Separator } from '../styles'
import { MobileNavLink } from '../../../styles/links'
import SectionLink from '../../sectionLink/SectionLink'

function MobileSectionNav({setClick, click, selected, setSelected}) {
  console.log(`clicked = ${click}`)
  return (
    <MobileNavContainer click={click}>
      <MobileNavLink onClick={() => setClick(!click)} click={click} to={"/register"}>Register</MobileNavLink>
      <MobileNavLink onClick={() => setClick(!click)} click={click} to={"/login"}>Login</MobileNavLink>
      <Separator click={click}/>
      <SectionLink 
        onClick={() => setClick(!click)}
        page="welcome"
        click={click} 
        text="welcome"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        onClick={() => setClick(!click)}
        page="about"
        click={click} 
        text="about"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        onClick={() => setClick(!click)}
        page="usability"
        click={click} 
        text="usability"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        onClick={() => setClick(!click)}
        page="products"
        click={click} 
        text="products"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        onClick={() => setClick(!click)}
        page="contactus"
        click={click} 
        text="contactus"
        selected={selected}
        setSelected={setSelected}
      />
    </MobileNavContainer>
  )
}

export default MobileSectionNav