import React from 'react'
import instructorImg from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CtaButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>

    <div className=' flex flex-col lg:flex-row gap-20 items-center'>

            <div className=' w-[50%] '>
                <img src={instructorImg} className=' shadow-white' alt='instructorImg'></img>
            </div>

            <div className=' w-[50%] flex flex-col gap-10 items-start'>

                <div className=' text-4xl font-semibold w-[50%]'><HighlightText text={"Become an Instructor"}></HighlightText></div>

                <p className=' font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructor from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love
                </p>


                <CtaButton active={true} linkto={"/sigup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CtaButton>

            </div>


    </div>


    </div>
  )
}

export default InstructorSection