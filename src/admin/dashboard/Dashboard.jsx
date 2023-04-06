import React from 'react'
import { useNavigate } from 'react-router-dom'
import Usertable from '../table/Usertable'
import './dashboard.css'

const Dashboard = () => {
const navigate = useNavigate("")

    const dashBoard =()=>{
        navigate("/dashboard")
    }
    const sendEmail =()=>{
        navigate("/send-bulk-email")
    }
    return (
        <div>
            <div className='heading'>
                <i className='fas fa-thin fa-home'></i>
                <h2>Dashboard</h2>
            </div>

            <div className='btndash'>
                <button type='button' onClick={dashBoard} className='btn btn-primary'>All Contacts</button>
                <button type='button' onClick={sendEmail} className='btn btn-primary'>Send email</button>
            </div>

        <div>
            <Usertable/>
        </div>

        </div>
    )
}

export default Dashboard
