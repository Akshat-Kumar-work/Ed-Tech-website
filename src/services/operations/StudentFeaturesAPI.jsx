import {studentEndpoints} from "../api";
import { toast } from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"


const {COURSE_PAYMENT_API, COURSE_VERIFY_API , SEND_PAYMENT_SUCCESS_EMAIL_API}= studentEndpoints;

//function to load external script
function loadScript(src) {
    return new Promise((resolve) => {
        // Create a new script element
        const script = document.createElement("script");
        // Set the 'src' attribute of the script to the provided URL
        script.src = src;

        // Event handler for when the script successfully loads
        script.onload = () => {
            // Resolve the Promise with 'true' to indicate successful loading
            resolve(true);
        }

        // Event handler for when there's an error loading the script
        script.onerror = () => {
            // Resolve the Promise with 'false' to indicate failure
            resolve(false);
        }

        // Append the script element to the <body> of the document
        document.body.appendChild(script);
    });
}

export async function buyCourse(token , courses , userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay sdk failed to load");
            return;
        }

        //initiate the order,call course payment api to create order for course
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
        {courses},
         {
            Authorization:`Bearer ${token}`
         })

         if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
         }

        //options
         const options={
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank You for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function (response){
                //send successfull mail
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
         }

    }
    catch(err){
        console.log("payment api error",err)
        toast.error("could not make payment");
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response , amount , token){
    try{
        
    }
    catch(err){

    }
}