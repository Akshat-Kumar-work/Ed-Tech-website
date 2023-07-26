import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BiDownArrow} from "react-icons/bi"


const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector( (state)=>state.course);
  
    const {token} = useSelector( (state)=>state.auth);
    const dispatch = useDispatch();
    //state to ad sub section
    const [addSubSection , setSubSection] = useState(null);
    //viewSubsection ->state to view subsection
    const [viewSubsection,setViewSubSection]=useState(null);
    //to edit subsection 
    const [editSubSection,setEditSubSection] = useState(null);
    //confirmation modal
    const [confirmationModal , setConfirmationModal] = useState(null);

    const handleDeleteSection= (sectionId)=>{

    }

    

  return (

    <div >

         <div className='rounded-lg bg-richblack-700 p-6 px-8'>

                <div>
                {/* section */}
                    {course?.courseContent?.map( (section)=>{
                   
                        return( 
                        <details key={section._id} open>
                           

                            {/* section summary */}
                            <summary className='flex items-center justify-between gap-x-3 border-b-2 pt-5'>

                                    {/* section name */}
                                    <div className='flex items-center gap-x-3'>                                  
                                        <RxDropdownMenu/>
                                        <p>{section.sectionName}</p>
                                    </div>

                                    {/* section btn's */}
                                    <div className='flex items-center gap-x-3'>

                                        <button onClick={()=>handleChangeEditSectionName(section.sectionName,section._id)}>
                                               <MdEdit/>
                                        </button>

                                        <button onClick={()=>{
                                            setConfirmationModal( {
                                                text1:"Delete this Section",
                                                text2:"All the lecture in this Section will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSection(section._id),
                                                btn2Handler:()=>setConfirmationModal(null)
                                            })
                                        }}>
                                            <RiDeleteBin6Line/>
                                        </button>

                                        <span>|</span>

                                        <BiDownArrow/>
                                    </div>

                            </summary>


                            {/* subSection summary */}
                            <div>
                                {
                                    section.subSection.map( (data)=>{
                                       
                                        return( 

                                        
                                            <div key={data?._id} onClick={()=>setViewSubSection(data)} className='flex items-center justify-between gap-x-3 border-b-2'>



                                            {/* subSection name */}
                                                <div className='flex items-center gap-x-3'>                                  
                                                     <RxDropdownMenu/>
                                                    <p>{data.title}</p>
                                                </div>


                                                    {/* subsection btn's */}
                                                <div className=' flex items-center gap-x-3'>

                                                        <button onClick={ ()=>setEditSubSection({...data , sectionId:section._id})}>
                                                                <MdEdit/>
                                                        </button>

                                                        <button onClick={()=>{}}>

                                                        </button>

                                                </div>      


                                             </div>

                                         

                                        )
                                     
                                    })
                                }
                            </div>


                        </details>)
                    })}
                </div>

         </div>

    </div>
  )
}

export default NestedView