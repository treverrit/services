import React from 'react'
import { SidebarItems, SidenavContainer } from './styles'
import {BiAccessibility} from 'react-icons/bi'
import { SidebarLink } from '../../styles/links'

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