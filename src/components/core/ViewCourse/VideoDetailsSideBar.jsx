import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoDetailsSideBar = () => {
    const [activeStatus , setActiveStatus] = useState("");
    const [videoBarActive,setvideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} = useParams();
    const{
        courseSectionData,
        coursEntireData,
        totalNoOfLecutres,
        completedLectures
    }=useSelector( (state)=>state.viewCourse);

    useEffect( ()=>{
        ;(()=>{
            if(!courseSectionData.length)
            return;
            // current section ka index nikala
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=>data._id === sectionId)
            //current subsection ka index nikala 
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=>data._id === subSectionId
            )
            //current lecture id nikali
            const acitveSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section id here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current lecture here
            setvideoBarActive(acitveSubSectionId);
        })()
    },[courseSectionData , coursEntireData , location.pathname])

  return (
    <>

            <div>

                {/* //for btns and heading */}
                <div>

                            {/* for btns */}
                            <div>
                                    <div onClick={()=>navigate("/dashboard/enrolled-courses")}>
                                        Back
                                    </div>

                                    <div>
                                        <IconBtn text="Add Review" />
                                    </div>

                                        <div>
                                            {/* for heading and titles */}
                                        </div>

                            </div>
                </div>
            </div>
         
    </>
  )
}

export default VideoDetailsSideBar