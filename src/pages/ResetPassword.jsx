import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authAPI'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const {loading} = useSelector( (state)=>state.auth);

    const onSubmit = (e)=>{
        e.preventDefault();
       dispatch(getPasswordResetToken(email,setEmailSent))
    }

  return (
    <div className=' text-white flex justify-center items-center'>
    {
        loading ? (
            <div>Loading...</div>
        ):(
            <div>

            <h1>{
                !emailSent ? "Reset your Password": "Check Your Email"
            }</h1>

            <p>
                {
                    !emailSent ? "Have no fear.We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
                     `We have sent the reset email to your ${email}`
                }
            </p>

            <form onSubmit={onSubmit}>
                
                {
                    !emailSent && (
                        <label>
                            <p>Email Address</p>
                            <input required type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value) } 
                            placeholder='Enter your Email Address' className='text-black'
                            ></input> 
                        </label>
                    )

                }
          

            <button type="submit">
                {
                    !emailSent ? "Submit" :  "Resend Email"
                }
            </button>
            </form>

            <div>
                <Link to="/login">
                    <p>Back to Login</p>
                </Link>
            </div>
            </div>
        )
    }

    </div>
  )
}

export default ResetPassword

