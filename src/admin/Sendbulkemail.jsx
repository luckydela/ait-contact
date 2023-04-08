import React from 'react'
import '../App.css'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const schema = yup.object({
  message:yup.string().required("Message field is required!"),
  
    })
const Sendbulkemail = () => {
  const live_sendbulkmsgurl= "https://user-contact-form.herokuapp.com/api/admin/admin-bulkEmail"
  //const local_sendbulkmsgurl= "http://localhost:8080/api/admin/admin-bulkEmail"

    const navigate = useNavigate("")
    const {handleSubmit, register, formState:{errors}} = useForm({
        resolver:yupResolver(schema),
        message:''
      });
      //console.log(errors);
    const sendbulkMsg = async (bulkmsg)=>{
      const res = await axios.post(live_sendbulkmsgurl, bulkmsg)
      .then(response=>{
        toast.success(response.data.data.message,{
          position:toast.POSITION.TOP_CENTER
        })
        setTimeout(()=>{
          navigate("/dashboard")
        }, 3000)
      
      }).catch(error=>{
        console.log(error);
      })
      return res
    }

  return (
    <>
      <div className='heading'>
        <ToastContainer/>
        <i className='fas fa-thin fa-envelope'></i>
       <h2>Send Email</h2>
     </div>
    <div className='' style={{justifyContent:"center", width:"100%", height:"100%", alignItems:"center", display:"flex"}}>
    <div className='user-card'>
      <h2> Send bulk Email </h2>
      <div className='card-container'>
        <form onSubmit={handleSubmit(sendbulkMsg)}>
    
          <div className='contactbox'>
          <label htmlFor="">Message</label>
            <textarea name='message' type="text" id='message' placeholder='Enter message here' {...register('message', { required: true })}></textarea>
            <span className='danger'>
                {errors.message?.message}
              </span>
          </div>

          <div className='btncls'>
            <button type='submit' className='btn btn-primary' >Send bulk email</button>
          </div>
        
        </form>
      </div>

    </div>
    </div>
   
    </>
  

  )
}

export default Sendbulkemail
