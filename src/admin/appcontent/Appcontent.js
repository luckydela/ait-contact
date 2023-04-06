import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Sendbulkemail from '../Sendbulkemail'

const Appcontent = () => {
  return (
    <Routes>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='send-bulk-email' element={<Sendbulkemail/>}/>
    </Routes>
  )
}

export default Appcontent
