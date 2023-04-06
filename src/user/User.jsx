import React from 'react'
import logo from '../assets/AIT_NEW_LOGO.png'
import '../App.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const schema = yup.object({
  name:yup.string().required("Name field is required!"),
  dob:yup.string().required("Please select date"),
  email:yup.string().required("Email field is required!").email(),
  phone:yup.string().required("Please enter your phone number"),
  address:yup.string().required("Address field is required!"),
  remarks:yup.string().required("Remarks field is required!"),
  })
const User = () => {
const live_sendcontacturl="https://user-contact-form.herokuapp.com/api/user/contact-form"
// const local_sendcontacturl="http://localhost:8080/api/user/contact-form"

  const navigate = useNavigate("")
  const {handleSubmit, register, formState:{errors}} = useForm({
    resolver:yupResolver(schema),
    name:'',
    dob:'',
    email:'',
    phone:'',
    address:'',
    remarks:''
  });
  console.log(errors);

  const submitContact = async ({name, dob, email, phone, address, remarks})=>{
    console.log({name, dob, email, phone, address, remarks});
    const res = await axios.post(live_sendcontacturl, {name, dob, email, phone, address, remarks })
        .then(response => {
            //console.log(response);
            setTimeout(() => {
              navigate("/contact-success")
            }, 2000)
        })
        .catch(error => {
            console.log(error);
        })

        return res
  }
  return (
    <div className='user-container'>
      {/* <Toaster position="top-center"/> */}
      <div className='user-card'>
        <h2>Contact Us</h2>
        <div className='card-container'>
          <form onSubmit={handleSubmit(submitContact)}>
          <div className='contactbox'>
          <label htmlFor="">Name</label>
              <input name='name' type="text" id='name' placeholder='Enter your Name' {...register('name', { required: true })} />
              <i className='fas fa-thin fa-user'></i>
              <span className='danger'>
                {errors.name?.message}
              </span>
            </div>

          <div className='contactbox'>
            <label htmlFor="">Date of Birth</label>
              <input name='dob' type="date" id='dob' placeholder='Enter Dob' {...register('dob', { required: true })} />
              <i className='fas fa-thin fa-envelope'></i>
              <span className='danger'>
                {errors.dob?.message}
              </span>
            </div>

            <div className='contactbox'>
            <label htmlFor="">Email</label>
              <input name='email' type="email" id='email' placeholder='Enter email'  {...register('email', { required: true })}/>
              <i className='fas fa-thin fa-envelope'></i>
              <span className='danger'>
              {errors.email?.message}
              </span>
            </div>

            <div className='contactbox'>
            <label htmlFor="">Phone number</label>
              <input name='phone' type="number" id='phone' placeholder='Enter Phone number' {...register('phone', { required: true })}/>
              <i className='fas fa-thin fa-phone'></i>
              <span className='danger'>
                {errors.phone?.message}
              </span>
            </div>

            <div className='contactbox'>
            <label htmlFor="">Address</label>
              <input name='address' type="text" id='address' placeholder='Enter Address' {...register('address', { required: true })} />
              <i className='fas fa-thin fa-address-book'></i>
              <span className='danger'>
                {errors.address?.message}
              </span>
            </div>
            <div className='contactbox'>
            <label htmlFor="">Remarks</label>
              <textarea  name='remarks' type="text" id='remarks' placeholder='Enter Remarks' {...register('remarks', { required: true })}></textarea>
              <span className='danger'>
                {errors.remarks?.message}
              </span>
            </div>

            <div className='btncls'>
              <button type='submit' className='btn btn-primary' >Submit Contact</button>
            </div>

            <br />


          </form>
        </div>
        <img src={logo} alt="gog logo" />

      </div>
    </div>

  )
}

export default User
