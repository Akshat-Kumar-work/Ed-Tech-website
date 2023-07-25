import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {total , totalItems} = useSelector( (state)=>state.cart);

  return (
    <div className='text-white'>
        <h1>Your Cart</h1>
        <p>{totalItems} Courses in Cart</p>
        {total > 0 ? Cart(<div>
            <RenderCartCourses/>
            <RenderTotalAmount/>
        </div>) : (<div>
            <p>Your Cart is Empty</p>
        </div>)}
    </div>
  )
}

export default Cart