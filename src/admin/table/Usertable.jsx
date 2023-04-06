import React, { useEffect, useState } from 'react'
import './table.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Usertable = () => {
  const live_allcontactsurl = "https://user-contact-form.herokuapp.com/api/admin/admin-getForms"
  //const local_allcontactsurl = "http://localhost:8080/api/admin/admin-getForms"

  const live_statusactivateurl = "https://user-contact-form.herokuapp.com/api/admin/admin-sendApproveDecision/"
  //const local_changestatusurl = "http://localhost:8080/api/admin/admin-sendApproveDecision"

  const  live_statusrejecturl ="https://user-contact-form.herokuapp.com/api/admin/admin-sendRejectDecision/"
  //const  local_statusrejecturl ="http://localhost:8080/api/admin/admin-sendRejectDecision"

const navigate = useNavigate("")
    const [columns, setcolumns] = useState([])
    const [records, setrecords] = useState([])
    const [status , setstatus] = useState({
      status: "",
    })

    useEffect(()=>{
      getallcontacts()
      
    },[])

    const getallcontacts= async ()=>{
      axios.post(live_allcontactsurl).then(response => {
         setcolumns(Object.keys(response.data.data.message[0]))
        setrecords(response.data.data.message)
        //console.log(response.data.data.message[0].status);
      })
    }
    const Approvebtn = async (id)=>{
      let act = 'Activated'
      console.log(JSON.stringify(act));
      const res = await axios.post(live_statusactivateurl+id, JSON.stringify(act))
      .then(response=>{
        //console.log(response);
        alert(response.data.data.data.status[0])
        navigate("/send-bulk-email")
      }).catch(error=>{
        console.log(error);
        alert(error)
      })
      return res
    }

    const Rejectbtn = async ( id)=>{
      const res = await axios.post(live_statusrejecturl+id, status)
      .then(response=>{
        //console.log(response);
        alert(response.data.data.data.status[0])
        navigate("/send-bulk-email")
      }).catch(error=>{
        console.log(error);
        alert(error)
      })
      return res
    }

  return (
    <div>
      <table id="contacts">
        <thead>
          <tr className='t-head'>
            {
              columns.map((b, i) => (
                <th key={i}>{b}</th>
              ))
            } 
            <th>Action</th>  
          </tr>
        </thead>
        <tbody>
           {
            records.map((data, i) => (
              <tr key={i}>  
              <td>{data.id}</td> 
              <td>{data.name}</td>
              <td>{data.dob}</td>   
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.address}</td>
              <td>{data.remarks}</td>
              <td>{data.status}</td>
                <td> 
                  <button type='submit' name='status'  id='status' value="Activated" style={{background:"#0a6533be"}} onClick={()=>Approvebtn(data.id)} onChange={(e)=> {setstatus({...status, status:e.target.value})}}>Activate</button>
                  <button type='submit' name='status' id='status' value="Reject" style={{background:"#000"}} onClick={()=>Rejectbtn(data.id)} onChange={(e)=> {setstatus({...status, status:e.target.value})}}>Reject</button> 
                </td>
              </tr>
            ))
          } 
        </tbody>
      </table>
    </div>
  )
}

export default Usertable
