import React from "react"
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

export default SectionLink