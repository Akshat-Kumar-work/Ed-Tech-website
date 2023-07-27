import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useState } from 'react'
import {BiAddToQueue} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'


const CourseBuilderForm = () => {


  const {register , handleSubmit,setValue , formState:{errors}} = useForm();

  
  const dispatch = useDispatch()
  // here editSectionName is section id
  const [editSectionName , setEditSectionName] = useState(null)
  const {course} = useSelector( (state)=>state.course)

  const [loading ,setLoading] = useState(false);
  const {token}= useSelector( (state)=>state.auth)


    // handle form submission
  const onSubmit = async(data)=>{
    console.log("editing section name")


    setLoading(true);

    if(editSectionName){
      //we are  editing section name
     let result = await updateSection({
        sectionName:data.sectionName , sectionId:editSectionName,courseId:course._id},token );
            //update values
        if(result){
         dispatch(setCourse(result));
          setEditSectionName(null);
        setValue("sectionName","")
  }
    }


    else{
     let result = await createSection( {sectionName : data.sectionName , courseId:course._id},token );
         //update values
  if(result){
    console.log(course)
    dispatch(setCourse(result));
    setEditSectionName(null);
    setValue("sectionName","")
  }
    }

  //loading false
  setLoading(false)

  }



  const cancelEdit = ()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }

    
  const goBack = () => {
    console.log("go back")
      dispatch(setStep(1))
      dispatch(setEditCourse(true))
    }


  const goToNext = ()=>{
    if(course?.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some( (section)=>section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each Section")
      return;
    }
    //if everthing good
    dispatch(setStep(3))
  }



 

  
  const handleChangeEditSectionName = (sectionName ,sectionId)=>{

    if(editSectionName === sectionId){
      cancelEdit();
      return
    }

    setEditSectionName(sectionId);
    setValue("sectioName",sectionName);
  }


  return (
    <div className='text-white'>

      <p>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>



        <div>
          <label htmlFor='sectionName'>Section name</label>
          <input id='sectionName' placeholder='Add section name' {...register("sectionName",{required:true})} className='w-full'/>
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>


          <div className=' mt-10 flex w-full'>


        <IconBtn type="Submit" text={ !editSectionName ? "Create Section" : "Edit Section Name"} outline={true} customClasses={"text-white"} >  
        <BiAddToQueue className='text-yellow-50' size={20}/>
        </IconBtn>

         
        {editSectionName && (<button type='Button' onClick={cancelEdit} className='text-sm text-richblack-300 underline ml-5'>Cancel Edit</button>)}


          </div>


      </form>


      

        {/* sections */}
          
        {course.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            
          )}

          <div className='flex justify-end gap-x-3 mt-10'>

            <button onClick={goBack} className='rounded-md cursor-pointer flex items-center '>Back</button>

            <IconBtn text="next" onclick={goToNext}> <BiRightArrow/></IconBtn>

          </div>
    </div>
  )
}

export default CourseBuilderForm

