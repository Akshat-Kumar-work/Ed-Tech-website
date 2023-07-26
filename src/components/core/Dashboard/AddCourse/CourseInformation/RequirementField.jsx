import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementField = ({name , label , register,errors,setValue,getValues}) => {
    //current requirement state
    const [requirement , setRequirement] = useState("");
    //all requirement list
    const[requirementList,setRequirementList] = useState([]);

    //on add requirement btn
    const handleAddRequirement = ()=>{
        //agar requirement m koi value hai
        if(requirement){
            //us value ko requirement list m daldo
            setRequirementList([...requirementList,requirement]);
            //requirement state ko empty kro
            setRequirement("");
        }
    }

    //will call on clear btn 
    const handleRemoveRequirement = (index)=>{
        console.log(index)
        
        const updatedRequirementList = [...requirementList];

        //index ki value hmesha zero hogi kyu ki phle wala hat jaega o index to 1 index tk slice kro mtlb ek current index value niklegi
        updatedRequirementList.splice(index,1);


        setRequirementList(updatedRequirementList)
    }

    useEffect( ()=>{
        register(name,{required:true})
    },[])

    useEffect( ()=>{
        setValue(name,requirementList)
    },[requirementList])

  return (
    <div >
            <label htmlFor={name}>{label}</label>
            <input type='text' id={name} value={requirement} onChange={(e)=>setRequirement(e.target.value)} className='w-full text-black' />
            <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>Add</button>

            {
                requirementList.length>0 &&(
                    <ul>
                        {
                            //requirement ki list par map fun lgya
                            requirementList.map( (requirement , index)=>{
                                return(
                                    <li key={index} className=' flex items-center text-richblack-5'>

                                        <span>{requirement } </span>
                                       
                                        {/* clear btn par click hone par remove func call hoga with index jo requirement list sy mila hai */}
                                        <button type='button' onClick={()=>handleRemoveRequirement(index)} className='text-xs text-pure-greys-300'> clear</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }

            {
                errors[name]&&(
                    <span>{label}</span>
                )            }
    </div>
  )
}

export default RequirementField