import React, { useState } from 'react'
import Appcontent from '../appcontent/Appcontent'
import Header from '../header/Header'
import './layout.css'
import logo from '../../assets/AIT_NEW_LOGO.png'

const AppLayout = () => {
    const [show] = useState(false)

  return (
    <main className={show ? 'space-toggle' : null}>
        <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle'>
        <img src={logo} alt="ait logo" />
        </div> 
        <Header/>
    </header>
      <Appcontent/>
        
    </main>
  )
}
export default AppLayout