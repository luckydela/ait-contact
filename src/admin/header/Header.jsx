import React from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate("");
    const logout=()=>{
        setTimeout(()=>{
          localStorage.removeItem('aittoken');
          localStorage.clear()
          navigate("/x-login")
        }, 2000)
    }
  return (
    <div className='hd'>
    <Link to="/dashboard" className='header-link'>
          <i className="fas fa-home"></i>
         <span className='nav-link-name'>Dashboard</span>
        <span className='nav-tooltip'>Dashboard</span>
    </Link>
    <Link to="/send-bulk-email" className='header-link'>
          <i className="fas fa-users"></i>
         <span className='nav-link-name'>Email to all</span>
        <span className='nav-tooltip'>Users</span>
    </Link>
  
       <Link onClick={logout} className='header-link'>
       <i className=" fas fa-light fa-user"></i>
       <span className='nav-tooltip'>logout</span>
      </Link>
    </div> 
  )
}

export default Header
