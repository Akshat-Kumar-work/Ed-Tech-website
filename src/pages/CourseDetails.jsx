import React from 'react'
import { useSelector } from 'react-redux'


const CourseDetails = () => {
    const {token} = useSelector( (state)=>state.auth)

    const handleBuyCourse = ()=>{
        if(token){
            buyCourse()
            return;
        }


    }



  return (
    <div className='flex items-center justify-center'>

        <button className=' bg-yellow-50' onClick={()=>handleBuyCourse()}>
            Buy now
        </button>
    </div>
  )
}

export default CourseDetails