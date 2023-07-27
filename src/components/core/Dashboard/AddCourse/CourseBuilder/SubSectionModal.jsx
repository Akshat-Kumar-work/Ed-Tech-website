import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import {toast} from "react-hot-toast";
import {createSubSection, editCourseDetails, updateSubSection} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from '../../../../../slices/courseSlice';
import {RxCross1} from "react-icons/rx";
import Upload from '../CourseInformation/Upload';
import IconBtn from "../../../../common/IconBtn"
import {  useSelector } from 'react-redux/es/hooks/useSelector';


const SubSectionModal = ({modalData , setModalData , add=false , view=false , edit=false}) => {

    const {register , handleSubmit , setValue , formState:{errors},getValues} = useForm();

    const dispatch = useDispatch();  

    const [loading , setLoading] = useState(false);

    const {course} = useSelector( (state)=>state.course);
  
    const {token} = useSelector( (state)=>state.auth);

    //phle render par form ki values set krdo jo modal data m present hai
    useEffect( ()=>{
      if(view || edit){
        setValue("lectureTitle",modalData.title);
        setValue("lectureDesc",modalData.description);
        setValue("lectureVideo",modalData.videoUrl);
      }
    },[])

    //kya form update hua hai ya nai
    const isFormUpdated = ()=>{
      const formAllCurrvalues = getValues();
      //agar form ki current value modal data ki current value k equal nahi hai toh mtlb form update hua hai 
      if(formAllCurrvalues.lectureTitle !== modalData.title || 
        formAllCurrvalues.lectureDesc !== modalData.description || 
        formAllCurrvalues.lectureVideo !== modalData.videoUrl){
          return true;
      }
      else{
        return false;
      }

    }

    const onSubmit = async (data)=>{

      if(view){
        return;
      }

      if(edit){

        if(!isFormUpdated){
          toast.error("No changes made to form");
        }else{
          //edit kro
          handleEditSubSection();
        }

      }

      //agar add kar rhe hai subsection ko
      const formData = new FormData();
      formData.append("sectionId",modalData);
      formData.append("title",data.lectureTitle);
      formData.append("description",data.lectureDesc);
      formData.append("video",data.lectureVideo);
      setLoading(true);
      //api call
      const result = await createSubSection({formData , token});
      if(result){
        //course state k andar course dalre hai
        dispatch(setCourse(result));

      }
      setModalData(null);
      setLoading(false)

    }



    const handleEditSubSection = async()=>{
      const currentValues = getValues();
      const formData = new FormData();

      //modal data is data came from backend present in course state
      formData.append("sectionId",modalData.sectionId);
      formData.append("subSectionID",modalData._id);

      if(currentValues.lectureTitle !== modalData.title){
        formData.append("title",currentValues.lectureTitle)
      }

      if(currentValues.lectureDesc !== modalData.description){
        formData.append("description",currentValues.lectureDesc)
      }

      if(currentValues.lectureVideo !== modalData.videoUrl){
        formData.append("video",currentValues.lectureVideo)
      }

      setLoading(true);
      const result = await updateSubSection({formData , token});
      if(result){
        //course state k andr update kr rhe hai
        dispatch(setCourse(result))
      }
      setModalData(null);
      setLoading(false);
    }
    
  return (
    <div>
          <div>


                <div>
                  <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                  <button onClick={()=>(!loading ? setModalData(null):{})}>
                    <RxCross1/>
                  </button>
                </div>

               <form onSubmit={handleSubmit(onSubmit)}>


                        <Upload name="lectureVideo" label="Lecture Video" register={register} setValue={setValue} errors={errors} video={true}
                        //view or edit false hai toh video nai dikhegi
                          viewData={view? modalData.videoUrl:null} editData={edit?modalData.videoUrl:null} 
                        />


                <div>
                  <label htmlFor='lectureTitle'>Lecture Title</label>
                  <input id='lectureTitle' placeholder='Enter Lecture Title' {...register("lectureTitle",{required:true})} className='w-full'/>
                  {
                    errors.lectureTitle &&(
                      <span>Lecture Title is required</span>
                    )
                  }
                </div>


                  <div>
                        <label htmlFor='lectureDesc'>Lecture Description</label>
                        <textarea id='lectureDesc' placeholder='Enter Lecture Description' {...register("lectureDesc",{required:true})} className='w-full min-h-[130px]'/>
                        {
                          errors.lectureDesc && (
                            <span>Lecture Description is required</span>
                          )
                        }
                  </div>



                  {
                    !view && (
                      <div>
                        <IconBtn text={loading ? "loading" :edit ? "Save Changes":"Save"}/>
                      </div>
                    )
                  }


              </form>
          </div>
    </div>
  )
}

export default SubSectionModal