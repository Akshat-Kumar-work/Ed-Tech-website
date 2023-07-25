import React, { useEffect, useState } from 'react'
import {getEnrolledCourses} from "../../../services/operations/profileAPI"
import { useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar';


const EnrolledCourses = () => {

    const {token} = useSelector( (state)=>state.auth);
    const [enrolledCourses , setEnrolledCourses] = useState(null);

    const getEnrolledCourse= async()=>{
        try{
            const response = await getEnrolledCourses(token);
            setEnrolledCourses(response)
        }
        catch(error){
            console.log("unable to fetch enrolled courses")
        }
    }

    useEffect( ()=>{
        getEnrolledCourse()
    },[])

  return (
    <div className='text-white'>
        <div>
        Enrolled Courses
        </div>

        {
            !enrolledCourses ? (<div className='spinner'></div>) : ( !enrolledCourses.length ? (<p>You have not enrolled i any course yet</p>) :(
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {/* cards */}
                    {
                        enrolledCourses.map( (course,index)=>{
                            <div key={index}>

                                <div>
                                    <img src={course.thumbnail} alt='course thumbnail'/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress:{course.progressPercentage || 0}%</p>
                                    <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false}/>
                                </div>
                            </div>
                        })
                    }
                </div>
            ))
        }
    </div>
  )
}

export default EnrolledCourses