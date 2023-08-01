import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import {setCompletedLectures, setCourseSectionData , setEntireCourseData, setTotalNoOfLectures} from "../slices/viewCourseSlice"
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';

const ViewCourse = () => {

    const [reviewModal , setReviewModal] = useState(false);

    const {courseId} =useParams();
    const{token} = useSelector( (state)=>state.auth);
    const dispatch = useDispatch()

    useEffect( ()=>{
      const setCourseSpecificDetails = async ()=>{
        const courseData = await getFullDetailsOfCourse(courseId ,token);
        dispatch(setCourseSectionData(courseData.courseDetaisl.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetaisl));
        dispatch(setCompletedLectures(courseData.completedVideos));
        let lectures =0;
        courseData?.courseDetails.courseContent.forEach( (section)=>{
          lectures = section.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures));

      }
      setCourseSpecificDetails()
    },[])


  return (
    <>

        <div>

                <VideoDetailsSideBar setReviewModal={setReviewModal}/>

                <div>
        {/* jo bhi component present hoga ViewCourse route k andar jo show krwao */}
                    <Outlet/>
                </div>

        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}

    </>
  )
}

export default ViewCourse