import React from 'react'
import ctaButton from "./Button";
import HighlightText from './HighlightText';
import {FaArrowRight} from "react-icons/fa"


const CodeBlocks = ( { position , heading , subheading , ctabtn1 , ctabtn2 ,CodeBlock , backgroundGradient , codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

        {/* section 1 */}
        <div className=' w-[50%] flex flex-col gap-8'>
          {heading}

          <div className=' font-bold text-richblack-300 '> 
          {subheading}
          </div>

          <div className=' flex  gap-7 mt-7'>
           <ctaButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className=' flex gap-2 items-center'>{ctabtn1.btnText} <FaArrowRight></FaArrowRight></div>
           </ctaButton>
          </div>

          <div className=' flex  gap-7 mt-7'>
           <ctaButton active={ctabtn2.active} linkto={ctabtn2.linkto}> 
           {ctabtn2.btnText}
           </ctaButton>
          </div>

        </div>
    </div>
  )
}

export default CodeBlocks