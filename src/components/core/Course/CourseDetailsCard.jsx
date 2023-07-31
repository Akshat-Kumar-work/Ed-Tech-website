import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {

    const {user} = useSelector( (state)=>state.profile);
    const {token} = useSelector( (state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddTocart = ()=>{

    }

    const handleShare = ()=>{
      
      }
    

  return (
    <div className='text-white'>
        <img src={course.thumbnail} alt='thumbnail img' className='max-h-[300px] min-h-[180px] rounded-xl'/>

        <div>Rs.{course.price}</div>

        <div className='flex flex-col gap-y-6'>


        <button onClick={user && course?.studentsEnrolled.includes(user?._id)
        ? ()=>navigate("/dashboard/enrolled-courses"): handleBuyCourse}>{
            user && course?.studentsEnrolled.includes(user?._id) ? "Go to course" :"Buy Now"
        }</button>


        {
          (!course?.studentsEnrolled.includes(user?._id)&&(
            <button onClick={()=>handleAddTocart}>
              Add to Cart
            </button>
          ) )
        }

        </div>

       

        <div> 
          <p>30-Day Money-Back Guarantee</p>
          <p>This Course Includes:</p>
          <div className='flex flex-col gap-y-3'>
          {
            course.instructions.map( (item,index)=>{
              return(
                <p key={index} className='flex gap-2'>
                <span>{item}</span>
              </p>
              )
            
            })
          }
          </div>
        </div>

        <div>
          <button onClick={()=>handleShare}>
            Share
          </button>
        </div>
      
    </div>
  )
}

export default CourseDetailsCard