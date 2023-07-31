import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/StudentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {fetchCourseDetails ,getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import  Error from './Error';
import ConfirmartionModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStar";
import {formatDate} from "../services/formatDate"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';


const CourseDetails = () => {
    const {token} = useSelector( (state)=>state.auth);
    const {paymentLoading} = useSelector((state)=>state.course);
    const {loading} = useSelector( (state)=>state.profile)
    const {user} = useSelector( (state)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const[confirmartionModal,setConfirmationModal] = useState(null);
     const [avgReviewCount,setAverageReviewCount] = useState(0)
    const [courseData , setCourseData] = useState(null)
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
      setIsActive(
          !isActive.includes(id)
           ? isActive.concat(id)
           : isActive.filter((e)=> e != id)

      )
  }
  
    
    useEffect( ()=>{
      const getCourseFullDetail = async()=>{
        try{
          const response = await fetchCourseDetails(courseId);   
          setCourseData(response)
        }
        catch(err){
          console.log("unable to fetch course details",err)
        }
      }
      getCourseFullDetail()
    },[courseId])

    


   
    useEffect(()=>{
    
        const count = GetAvgRating(courseData?.courseDetails.ratingAndReviews);
      setAverageReviewCount(count)
      
    },[courseData])

    const [totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    useEffect( ()=>{
      let lectures =0;
      //confusion
      courseData?.courseDetails.courseContent.forEach( (sec)=>{
        lectures += sec.subSection.length ||0;
      })
      setTotalNoOfLectures(lectures)
    },[courseData])


    const handleBuyCourse = ()=>{
      
       if(!token){
        toast.error("Please Login or Signup ");

        setConfirmationModal({
          text1:"you are not logged in",
          text2:"Please login to purchase course",
          btn1Text:"Login",
          btn2Text:"Cancel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null)
        })
       }
       
        if(token){
            buyCourse(token,[courseId],user , navigate,dispatch)
            return;
        }


    }

    if (loading || !courseData){
      return(
        <div>
          Loading...
        </div>
      )
    }

    if(!courseData.success){
      return(
        <div>
          <Error/>
        </div>
      )
    }

    

    const{
      _id:course_id,
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      courseContent,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      createdAt
    }=courseData?.courseDetails;

console.log(courseData)

  return (
    <div className='flex flex-col items-center justify-center text-white'>
       <div className='relative flex flex-col justify-start p-8'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div className='flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews) `}</span>
                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailsCard 
                    course = {courseData.courseDetails}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>
        </div>


        <div>
            <p> What You WIll learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content:</p>
            </div>

            <div className='flex gap-x-3 justify-between'>

                   <div>
                    <span>{courseContent.length} section(s)</span>

                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <span>
                            {courseData.totalDuration} total length
                        </span>
                   </div>

                   <div>
                        <button
                            onClick={() => setIsActive([])}>
                            Collapse all Sections
                        </button>
                   </div>

            </div>
        </div>


        {confirmartionModal && <ConfirmartionModal modalData={confirmartionModal}/>}
    </div>
  )
}

export default CourseDetails