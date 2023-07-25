import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'

const CourseInformationForm = () => {

  const {course , editCourse} = useSelector ( (state)=> state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories,setCourseCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  }=useForm();

  const dispatch = useDispatch();

  useEffect( ()=>{
    const getCategories = async()=>{
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length>0){
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    //agar editCourse true hua hai toh course ki properties update krdo on behalf of register string
    if(editCourse){
      setValue("courseTitle",course.courseName)
      setValue("courseShortDesc",course.courseDescription)
      setValue("coursePrice",course.price)
      setValue("courseTags",course.tag)
      setValue("courseBenefits",course.whatYouWillLearn)
      setValue("courseCategory",course.category)
      setValue("courseRequirements",course.instructions)
      setValue("courseImage",course.thumbnail)
    }
    getCategories()
  },[])

  const onSubmit = async(data)=>{

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>



    {/* course title */}
    <div>
          <label htmlFor='courseTitle'>Course Title</label>
          <input id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle",{required:true})} className='w-full'/>
          {
            errors.courseTitle &&(
              <span>Course Title is required</span>
            )
          }
    </div>


    {/* course short description */}
    <div>
      <label htmlFor='courseShortDesc'>Course Short Description</label>
      <textarea id="courseShortDesc" placeholder='Enter Description' {...register( "courseShortDesc",{required:true})} className='w-full min-h-[130px] '/>
      {
        errors.courseShortDesc &&(
          <span>Course Description is required</span>
        )
      }
    </div>


    {/* course price */}
    <div className='relative'>
      <label htmlFor='coursePrice'>Course Price</label>
      <input id='coursePrice' placeholder='Enter Course Price' {...register("coursePrice",{required:true , valueAsNumber:true}) } className='w-full '/>
      <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
      {
        errors.coursePrice &&(
          <span>Course Price is required</span>
        )
      }
    </div>


    {/* categories drop down  */}
    <div>
          <label htmlFor='courseCategory'>Course Categories</label>
          <select id='courseCategory' defaultValue="" {...register("courseCategory",{required:true})}>
                  <option value="" disabled >Choose a Category</option>
                  {
                    !loading && courseCategories.map( (category,index)=>{
                      return(
                        <option key={index} value={category?._id}>
                          {category?.name}
                        </option>
                      )
                    })
                  }
           </select>
           {
            errors.courseCategories &&(
              <span>Course Categories is required</span>
            )
           }
    </div>


    {/* tags input */}



    {/* thumbnail uploader */}
      





    </form>
  )
}

export default CourseInformationForm