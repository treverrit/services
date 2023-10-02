import React from 'react'
import { LandingNavContainer } from './styles'
import MobileSectionNav from '../mobileNav/mobileSectionNav/MobileSectionNav'
import SectionLink from '../sectionLink/SectionLink'

function LandingNav({click, selected, setSelected}) {
  return ( 
    <div>
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
  </div>)
}

export default LandingNav