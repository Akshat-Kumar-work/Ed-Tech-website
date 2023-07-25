import React from 'react'
import { useSelector } from 'react-redux'
import Iconbtn from "../../../common/IconBtn"

const RenderTotalAmount = () => {
    const {total} = useSelector((state)=>state.cart)
    const handleBuyCourse=()=>{
        const courses = cart.map( (course)=>course._id)
        console.log(courses)
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs{total}</p>
        <Iconbtn text="Buy Now" onclick={handleBuyCourse} customClasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount