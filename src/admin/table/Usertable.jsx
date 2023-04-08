import React, { useEffect, useState } from 'react'
import './table.css'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

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
    const [loading, setloading] = useState(false)
  

    useEffect(()=>{
      setloading(true)
      setTimeout(()=>{
        getallcontacts()
        setloading(false)
      }, 3000)
      
    },[])

    const getallcontacts= async ()=>{
      await axios.post(live_allcontactsurl).then(response => {
         setcolumns(Object.keys(response.data.data.message[0]))
        setrecords(response.data.data.message)
        

      })
    }
    const Approvebtn = async(id)=>{
      const obj = '{"status":"Activate"}';
      const json  = JSON.parse(obj)
      //console.log(json);
      const res = await axios.post(live_statusactivateurl+id, json)
      .then(response=>{
        //console.log(response);
        toast.success(response.data.data.message,{
          position:toast.POSITION.TOP_CENTER
        })
        setTimeout(()=>{
          navigate("/send-bulk-email")
        }, 2000)

      }).catch(error=>{
        toast.error("Server Error!",{
          position:toast.POSITION.TOP_CENTER
        })
      })

      return res

    }

    const Rejectbtn = async (id)=>{
      const obj = '{"status":"Reject"}';
      const json  = JSON.parse(obj)
      //console.log(json);
      const res = await axios.post(live_statusrejecturl+id, json)
      .then(response=>{
        //console.log(response);
        toast.success(response.data.data.message,{
          position:toast.POSITION.TOP_CENTER
        })
        setTimeout(()=>{
        }, 2000)

      }).catch(error=>{
        toast.error("Server Error!",{
          position:toast.POSITION.TOP_CENTER
        })
      })
      return res

    }

  return (
    <div>
      <ToastContainer/>
        {
          loading? 
          <span>Loading...<FadeLoader className='clips' color="#44045d" loading={loading} size={20}  /></span>   
                :
             
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
                   <button type='submit' name='status'  id='status' style={{background:"#0a6533be"}} onClick={e=>Approvebtn(data.id)}>Activate</button>
                  <button type='submit' name='status' id='status' value="Reject" style={{background:"#000"}} onClick={()=>Rejectbtn(data.id)}>Reject</button> 
                </td>
              </tr>
            ))
          } 

        </tbody>

      </table>

          
        }
        
    </div>
  )
}

export default Usertable
