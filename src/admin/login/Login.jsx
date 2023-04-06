import React from 'react'
import '../../App.css'
import logo from '../../assets/AIT_NEW_LOGO.png'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const schema = yup.object({
    email: yup.string().required("Email field is required!").email(),
    password: yup.string().required("Password field is required").min(4, "Password must be at least 4 characters")
}) 

const Login = () => {
    const live_adlgnurl = "https://user-contact-form.herokuapp.com/api/admin/admin-login"
        //const local_adlgnurl = "http://localhost:8080/api/admin/admin-login"

    const navigate = useNavigate("")
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        email: '',
        password: ''
    });
    //console.log(errors);
    const formSubmit = async ({ email, password }) => {
        console.log({ email, password });
        const res = await axios.post(live_adlgnurl, { email, password })
            .then(response => {
               //console.log(response);
               const {  data } = response.data;
               if(data.success) {
                 localStorage.setItem('aitadmindata', JSON.stringify(response.data));           
                 setTimeout(()=>{
                   navigate("/dashboard")
                 }, 2000)
                 return;
               }
               if(data){
                console.log(data);
                 return;
               }
            })
            .catch(error => {
                console.log(error);
            })
            return res
    }

    return (
        <div className='user-container' style={{ height: "100vh" }}>
            <div className='user-card'>
                <h2> Admin login </h2>
                <div className='card-container'>
                    <form onSubmit={handleSubmit(formSubmit)}>

                        <div className='contactbox'>
                            <label htmlFor="">Email</label>
                            <input name='email' type="email" id='email' placeholder='Enter email' {...register('email', { required: true })} />
                            <i className='fas fa-thin fa-envelope'></i>
                            <span className='danger'>
                                {errors.email?.message}
                            </span>
                        </div>

                        <div className='contactbox'>
                            <label htmlFor="">Password</label>
                            <input name='password' type="password" id='password' placeholder='Enter Password' {...register('password', { required: true })} />
                            <i className='fas fa-thin fa-lock'></i>
                            <span className='danger'>
                                {errors.password?.message}
                            </span>
                        </div>

                        <div className='btncls'>
                            <button type='submit' className='btn btn-primary' >login</button>
                        </div>
                        <br />
                        <p>You do not have an account? <Link to="/x-signup">Signup</Link></p>
                    </form>
                </div>
                <img src={logo} alt="gog logo" />

            </div>
        </div>
    )
}

export default Login
