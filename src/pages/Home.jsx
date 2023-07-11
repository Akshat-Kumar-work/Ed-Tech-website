import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa"
import HighlighText  from "../components/core/HomePage/HighlightText"
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
const Home = () => {
  return (
    <div>

    {/*section 1*/}
      <div className=' max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>

            <Link to={"/signup"}>
              <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all-duration-200 hover:scale-95 w-fit ">
                <div className=' flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 shadow-inner'>
                  <p>Become an Instructor</p>
                  <FaArrowRight></FaArrowRight>
                </div>
              </div>
             </Link>

             <div className='  text-4xl font-semibold mt-7'>
              Empower Your Future with
              <HighlighText text={"Coding Skills"}/>
             </div>


              <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
             With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
              </div>

              <div className=' flex flex-row gap-7 mt-8'> 
                    <CTAButton active={true} linkto={"/signup"}> Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>Book a Demo</CTAButton>

              </div>
             
              <div className=' mx-3 my-12 shadow-blue-200 shadow-md'>
              <video muted loop autoPlay>
                  <source src={Banner} type='video/mp4'></source>
                </video>
              </div>

              {/*code section 1*/}
              <div className='text-2xl font-semibold'>
                <CodeBlocks position={"lg:flex-row"}
                 heading={<div>Unlock Your <HighlighText text={"coding potential"}></HighlighText>with our online courses</div>} 
                 subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                 ctabtn1={
                 {
                  active:true,
                  btnText:"try it yourself",
                  linkto:"/signup",
                  
                 }
                 }
                 ctabtn2={
                 {
                  btnText:"learn more",
                  linkto:"/signup",
                  active:false,
                 }
                 }
                 
                 ></CodeBlocks>
              </div>
      </div>
    {/*section 2*/}

    {/*section 3*/}
    
    {/*footer*/}

    </div>
  )
};

export default Home