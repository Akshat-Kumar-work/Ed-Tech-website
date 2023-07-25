import { toast } from "react-hot-toast";
import {profileEndpoints} from "../api"
import { apiConnector } from "../apiConnector";

const{GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

export async  function getEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response =  await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,null,{
            //sending token in header
            Authorization: `Bearer ${token}`,
        })
 
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}
