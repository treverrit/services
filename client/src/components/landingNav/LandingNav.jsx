import React from 'react'
import { LandingNavContainer } from './styles'
import { LandingNavCircle, LandingNavDescription, LandingNavLink } from '../../styles/links'

function SectionLink({page, click, text, selected, setSelected}) {
  const isSelected = page === selected

  return (
    <LandingNavLink href={`#${page}`} onClick={() => setSelected(page)}>
      <LandingNavCircle isSelected={isSelected}/>
      <LandingNavDescription click={click} isSelected={isSelected}>
        {text}
      </LandingNavDescription>
    </LandingNavLink>
  )
}

function LandingNav({click, selected, setSelected}) {
  return (
    <LandingNavContainer click={click}>
      <SectionLink 
        page="welcome"
        click={click} 
        text="welcome"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        page="about"
        click={click} 
        text="about"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        page="usability"
        click={click} 
        text="usability"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        page="products"
        click={click} 
        text="products"
        selected={selected}
        setSelected={setSelected}
      />
      <SectionLink 
        page="contactus"
        click={click} 
        text="contactus"
        selected={selected}
        setSelected={setSelected}
      />
    </LandingNavContainer>
  )
}

export default LandingNav