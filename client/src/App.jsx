import React, {useCallback, useEffect, useState} from 'react'
import Navbar from './components/navbar/Navbar'
import { PageContainer } from './appStyles'
import Sidenav from './components/sidenav/Sidenav'
import LandingNav from './components/landingNav/LandingNav'
import {Outlet, useLocation} from 'react-router-dom'
import useMediaQuery from './hooks/useMediaQuery'
import LandingNavigation from './sections/landingNavigation/LandingNavigation'

function App() {
  const [clickCollapse, setClickColapse] = useState(false) // for the collapse button
  const [userName, setUserName] = useState("") // to set the username to view it
  const [id, setId] = useState("") // for eventual requests not save to live 
  const [jwt, setJWT] = useState("") // to set the jwt and access
  const [tickInterval, setTickInterval] = useState(null)
  const [selected, setSelected] = useState("welcome")
  const location = useLocation()
  console.log(`jwt: ${jwt}`)
  console.log(`location: ${location.pathname}`)
  const hasSideNav = location.pathname !== "/register" && location.pathname !== "/login"
  const isAboveMobileScreens = useMediaQuery("(min-width: 500px)")

  // send request to refresh every 10 minutes or everytime it was used with status true
  const toggleRefresh = useCallback((status) => {
    if (status) {
      const interval = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
  
        fetch("http://localhost:8080/refresh", requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.accessToken) {
              setJWT(data.accessToken)
            }
          })
          .catch(error => console.log(error))
      }, 600000)
      setTickInterval(interval)
    } else {
      setTickInterval(null)
      clearInterval(tickInterval)
    }
  }, [tickInterval])

  // refreshes th token every time the side is refreshed
  useEffect(() => {
    if (jwt === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch("http://localhost:8080/refresh", requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            setJWT(data.accessToken)
            setUserName(data.account.name)
            setId(data.account.id)
            toggleRefresh(true)
          }
        })
        .catch(error => console.log(error))
    }
  }, [jwt, toggleRefresh])

  // set jwt to an empty string and calls the backend to delete the tokens
  const handleLogout = () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${jwt}`)
    const requestOptions = {
      method: "GET",
      headers: headers,
      credentials: "include"
    }

    fetch("http://localhost:8080/logout", requestOptions)
      .catch(error => console.log(error))
      .finally(() => {
        setJWT("")
        toggleRefresh(false)
      })
  }
  
  return (
    <>
      <Navbar 
        aboveMobile={isAboveMobileScreens}
        click={clickCollapse} 
        setClick={setClickColapse} 
        jwt={jwt}
        handleLogout={handleLogout} 
        name={userName}
        id={id}
        hasSideNav={hasSideNav}
      />  
      {hasSideNav && (
        location.pathname === "/" 
        ? <LandingNavigation
            click={clickCollapse}
            setClick={setClickColapse}
            aboveMobile={isAboveMobileScreens}
            selected={selected}
            setSelected={setSelected}
          />
        : <Sidenav
            click={clickCollapse}
          />
      )
      }
      <PageContainer>
        <Outlet
          context={{
            jwt, setJWT,
            userName, setUserName,
            id, setId,
            toggleRefresh,
            hasSideNav
          }}
        />
      </PageContainer>
    </>
  )
}

export default App


