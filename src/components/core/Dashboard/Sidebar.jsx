import React from 'react'
import  { sidebarLinks } from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useSelector } from 'react-redux'
import SidebarLinks from './SidebarLinks'

const Sidebar = () => {
    const {user , loading:profileLoading} = useSelector( (state)=>state.profile);
    const {loading:authLoading} = useSelector( (state)=>state.auth);

    if(profileLoading || authLoading){
        return (
            <div className='spinner'></div>
        )
    }
  return (

    <div >

    <div className='flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

        <div className=' flex felx-col'>
            {
                sidebarLinks.map( (link)=>{
                    if(link.type && user?.accountType !== link.type ){
                        return null;
                    }
                    return(
                        <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>

        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-500'></div>

        <div className='flex flex-col'>
            <SidebarLinks link={ {name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"></SidebarLinks>

           
        </div>


    </div>

    </div>

  )
}

export default Sidebar