import React from 'react'
import LandingNav from '../../components/landingNav/LandingNav'
import MobileSectionNav from '../../components/mobileNav/mobileSectionNav/MobileSectionNav'

function LandingNavigation({setClick, click, selected, setSelected, aboveMobile}) {
  return (
    <>
      {aboveMobile ? (
        <LandingNav
          click={click} 
          selected={selected} 
          setSelected={setSelected}
        />
      ) : (
        <MobileSectionNav
          click={click} 
          selected={selected} 
          setSelected={setSelected}
          setClick={setClick}
        />
      )}
    </>
  )
}

export default LandingNavigation

