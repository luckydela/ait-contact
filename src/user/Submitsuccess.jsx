import React, { useEffect } from 'react'
import logo from '../assets/AIT_NEW_LOGO.png'
import '../App.css'
import { useNavigate } from 'react-router-dom'


const Submitsuccess = () => {

   const navigate = useNavigate("")

useEffect(()=>{
    conFirmsuccess()
})

const conFirmsuccess = ()=>{
    setTimeout(()=>{
        navigate("/")
    }, 3000)
}

  return (
    <div className='user-container' style={{ height: "100vh" }}>
    <div className='user-card'>
        <h2>Contact Us</h2>
        <div className='card-container'>
          <form>
          <div className='contactbox'>
            <br />
              <h2>Thank you for contacting us</h2>
                 <h3>We will get back to you soon</h3>
            </div>
            <br />
          </form>
        </div>
        <img src={logo} alt="gog logo" />
      </div>
    </div>

  )
}

export default Submitsuccess
