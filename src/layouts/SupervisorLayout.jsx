import React from 'react'
import Navbar from '../components/shared/Navbar.jsx'
import { Outlet } from 'react-router-dom'
export default function SupervisorLayout() {
  return (
    <>
    <Navbar navItems={["Home", "Profile", "Technical Support"]}/>
    <Outlet/>
    </>
  )
}
