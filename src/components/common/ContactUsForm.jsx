import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {apiConnector} from "../../services/apiConnector"
import {contactusEndpoint} from "../../services/api"


const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);

    const{
        register,
        handleSubmit,
        reset, formState:{errors,isSubmitSuccessful}
    } = useForm();

    useEffect( ()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                message:"",
                phoneNo:""
            },[isSubmitSuccessful,reset])
        }
    })

const submitContactForm = async(data)=>{
    console.log(data)
    try{
        setLoading(true);
       // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
        const response = {status:"ok"}
        console.log(response)
        setLoading(false);
    }
    catch(error){
        console.log("Error",error.message);
        setLoading(false);
    }
}

  return (
    <form onSubmit={handleSubmit(submitContactForm)} >

            <div className=' flex flex-col gap-1'>
            <div className='flex gap-5'>
        {/* firstname */}
        <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input type='text' name='firstname' id='firstname' placeholder='Enter your first name' {...register("firstname",{required:true})} className='text-black'/>
            { 
                errors.firstname && (<span>Please enter your first name</span>)
            }
        </div>

        {/* last name */}
        <div className='flex flex-col'>
            <label htmlFor='lastname'>Last Name</label>
            <input type='text' name='lastname' id='lastname' placeholder='Enter your last name' {...register("lastname")} className='text-black'/>
        </div>

        </div>

        {/* email */}
        <div className='flex flex-col'>
            <label htmlFor='email' >Email</label>
            <input type='email' name='email' id='email' placeholder='Enter your email Address' {...register("email",{required:true})} className='text-black'/>
            {
                errors.email && (<span>Please enter your email address </span>)
            }
        </div>

        {/* message box */}
        <div className=' flex flex-col'>
            <label htmlFor='message'>Message</label>
            <textarea name='message' id='message' cols="30" rows="7" placeholder='Enter your message here'{...register("message",{required:true})} className='text-black'></textarea>
        </div>

        <button type='submit' className='rounded-md bg-yellow-50 text-center px-6 py-3 text-[16px] font-bold text-black'>Send Message </button>
            </div>


    

    </form>
  )
}

export default ContactUsForm