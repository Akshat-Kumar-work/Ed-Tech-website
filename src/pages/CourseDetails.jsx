import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/StudentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const CourseDetails = () => {
    const {token} = useSelector( (state)=>state.auth);
    const {user} = useSelector( (state)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleBuyCourse = ()=>{
       if(!token){
        toast.error("Please Login or Signup ")
       }
        if(token){
            buyCourse(token,[courseId],user , navigate,dispatch)
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