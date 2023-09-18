import React, {useCallback, useEffect, useState} from 'react'
import Navbar from './components/navbar/Navbar'
import { PageContainer } from './appStyles'
import Sidenav from './components/sidenav/Sidenav'
import {Outlet} from 'react-router-dom'

function App() {
  const [clickCollapse, setClickColapse] = useState(false)
  const [userName, setUserName] = useState("")
  const [id, setId] = useState("")
  const [jwt, setJWT] = useState("")
  const [tickInterval, setTickInterval] = useState(null)
  console.log(`jwt: ${jwt}`)

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
        click={clickCollapse} 
        setClick={setClickColapse} 
        jwt={jwt}
        handleLogout={handleLogout} 
        name={userName}
        id={id}
      />  
      <Sidenav click={clickCollapse}/>
      <PageContainer>
        <Outlet
          context={{
            jwt, setJWT,
            userName, setUserName,
            id, setId,
            toggleRefresh,
          }}
        />
      </PageContainer>
    </>
  )
}

export default App
