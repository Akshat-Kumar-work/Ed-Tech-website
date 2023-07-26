import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import RequirementField from './RequirementField';
import {setStep} from '../../../../../slices/courseSlice'
import IconBtn from "../../../../common/IconBtn"
import { setCourse } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import {COURSE_STATUS} from "../../../../../utils/constants"
import ChipInput from './ChipInput';
import Upload from './Upload';

const CourseInformationForm = () => {

  const {token} = useSelector((state)=>state.auth)
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

  const isFormUpdated= ()=>{

    const currentValues = getValues();


    if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
       currentValues.courseTags.toString()!== course.tag.toString() ||
      currentValues.courseCategory._id!== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ){
      return true
    }
    else{
      return false
    }
  }

  const onSubmit = async(data)=>{
    console.log("course data",data)

//  if(editCourse){

//   if(isFormUpdated()){

    
//       const currentValues = getValues();
//       const formData = new FormData()
   

//       formData.append("courseId",course._id);

//       if(currentValues.courseTitle!== course.courseName){
//         formData.append("courseName",data.courseTitle)
//       }

//       if(currentValues.courseShortDesc !== course.courseDescription){
//         formData.append("courseDescription",data.courseShortDesc)

//       }
//       if(currentValues.coursePrice !== course.price){
//         formData.append("price",data.coursePrice)

//       }
//       if (currentValues.courseTags.toString() !== course.tag.toString()) {
//         formData.append("tag", JSON.stringify(data.courseTags))
//       }
      
//       if(currentValues.courseCategory._id!== course.category._id ){
//         formData.append("category",data.courseCategory)

//       }
//       if (currentValues.courseImage !== course.thumbnail) {
//         formData.append("thumbnailImage", data.courseImage)
//       }

//      if( currentValues.courseRequirements.toString() !== course.instructions.toString() ){
//       formData.append("instructions", JSON.stringify(data.courseRequirements))

//      }

//      setLoading(true);
//      const result = await editCourseDetails(formData,token);
//      setLoading(false);
//      if(result){
//       setStep(2);
//       dispatch(setCourse(result));
//      }
//   }
  
//   else{
//     toast.error("NO CHANGES MADE SO FAR ")
//   }
//   return;

// }

//CREATE A NEW COURSE

const formData  = new FormData();

formData.append("courseName", data.courseTitle)
formData.append("courseDescription", data.courseShortDesc)
formData.append("price", data.coursePrice)
formData.append("tag", JSON.stringify(data.courseTags))
formData.append("whatYouWillLearn", data.courseBenefits)
formData.append("category", data.courseCategory)
formData.append("status", COURSE_STATUS.DRAFT)
formData.append("instructions", JSON.stringify(data.courseRequirements))
formData.append("thumbnailImage", data.courseImage)

console.log("new form data",formData)

setLoading(true);
const result = await addCourseDetails(formData,token);
if(result){
  dispatch(setStep(2));
  dispatch(setCourse(result))
}
setLoading(false)

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
    <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />


    {/* thumbnail uploader */}
    <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}/>


    {/* benefits of the course */}
    <div>
      <label htmlFor='courseBenefits'>Benefits of the course</label>
      <textarea id='courseBenefits' placeholder='Enter Benefits of the course' {...register('courseBenefits',{required:true})} className='min-h[130px] w-full'/>
      {
        errors.courseBenefits && (
          <span>Course Benefits are required</span>
        )
      }
    </div>


    {/* requirement fields */}
    <RequirementField name="courseRequirements" label="Requirement / Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues}/>


      <div>

            {
              editCourse && (
                <button onClick={()=>dispatch(setStep(2))} className='flex items-center gap-x-2 bg-richblack-300'>Continue Without Save</button>                
              )
            }

            <IconBtn text={!editCourse ? "Next":"Save Changes"} />

      </div>

    </form>
  )
}

export default CourseInformationForm