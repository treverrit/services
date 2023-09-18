import React from 'react'
import { SidebarItems, SidebarLink, SidenavContainer } from './styles'
import {BiAccessibility} from 'react-icons/bi'

function Sidenav({click}) {
  return (
    <>
      <SidenavContainer click={click}>
        <SidebarItems>
          <SidebarLink click={click}><BiAccessibility/> <span>Ass</span> </SidebarLink>
          <SidebarLink click={click}><BiAccessibility/> <span>Ass</span> </SidebarLink>
          <SidebarLink click={click}><BiAccessibility/> <span>Ass</span> </SidebarLink>
          <SidebarLink click={click}><BiAccessibility/> <span>Ass</span> </SidebarLink>
        </SidebarItems>
      </SidenavContainer>
    </>
  )
}

export default Sidenav