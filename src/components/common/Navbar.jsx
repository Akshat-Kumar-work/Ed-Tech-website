import React from 'react'
import {NavbarLinks} from "../../data/navbar-links"
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'

const Navbar = () => {

  //fetching state
  const {token} = useSelector( (state)=>state.auth);
  const {user} = useSelector( (state)=>state.profile);
  const {totalItems} = useSelector( (state)=>state.cart);

  const location = useLocation()
  const matchRoute = (route)=>{
    return matchPath( {path:route} , location.pathname);
  }

  return (
    <div className=' flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

    <div className=' w-11/12 flex max-w-maxContent items-center justify-between'>

            <Link to="/">
              <img src={logo} width={160} height={42}/>
            </Link>

            <nav>
              <ul className=' flex gap-x-6 text-richblack-25'>
                  {NavbarLinks.map( (link , index)=>{
                    return(
                      <li key={index} >
                        {
                          link.title === "Catalog" ? <div></div>
                          : (
                            <Link to={link?.path}>
                             <div className={`${matchRoute(link?.path)? "text-yellow-25" :"text-richblack-25"}`}>{link.title}</div>
                             </Link>
                          )
                          }
                    </li>
                     )
                   
                  })}
              </ul>
            </nav>

            {/* login signup dashboard */}

            <div className=' flex gap-x-4 items-center'>

           {
            user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart/>{
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
           }

           {
            token === null && (
              <Link to="/login">
                <button>
                  Log In
                </button>
              </Link>
            )
           }

           {
            token === null && (
              <Link to="/signup">
                <button>
                 Sign Up
                </button>
              </Link>
            )
           }

           {
            token !== null &&<ProfileDropDown/>
           }
            </div>

    </div>

    </div>
  )
}

export default Navbar