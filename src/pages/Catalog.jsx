import React from 'react';
import Footer from "../components/common/footer"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';


const Catalog = () => {

  const {catalogName} = useParams();
  const [catalogPageData , setCatalogPageData] = useState(null);
  const [categoryId , setCategoryId] = useState("");

  //fetch all categories , y tab call hoga jab catalogName ki value change hogi,
  useEffect(()=>{
    try{
    //sari categories fetch hogi
    const getCategories = async()=>{
      const res = await apiConnector("GET",categories.CATEGORIES_API);
      //current category id nikali sari category se current catalog name compare krwa kar
      //yaha filter karengy agar jo category selected hai aur res m vo miljaegi toh usko category_id m daldengy vrna empty array daljaega category_id m
      const category_id = res?.data?.data?.filter( (ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
    
      setCategoryId(category_id)
     
     
    }
    getCategories()
    }
    catch(err){
      console.log("fetch categories error",err)
    }

  },[catalogName])


  //fetching selected category details by using category id
  useEffect( ()=>{
    const getcategoryDetails = async()=>{
      try{
        const response = await getCatalogPageData(categoryId);
        console.log(response)
        setCatalogPageData(response);
      }
      catch(err){
        console.log("get category details error",err)
      }
    }
   
    //if condition eslie lgai taki agar categoryId selected nai hai toh usme empty array put hoga filter se,toh agar empty array hai toh call na ho
    if(categoryId){
      getcategoryDetails()
    }
    

  },[categoryId])

  return (
    <div className='text-white'>

          <div>
              <p>{`Home / Catalog`} <span>{catalogPageData?.data?.data?.selectedCategory?.name}</span></p>
              <p></p>
              <p></p>
          </div>


          <div>

              {/* section 1 */}
              <div>
                    <div className='flex gap-x-3'>
                          <p>Most Popular</p>
                          <p>New</p>
                    </div>
                    {/* <CourseSlider/> */}
              </div>

              {/* section 2 */}
              <div>
                <p>Top Courses</p>
                <div>
                  {/* <CourseSlider/> */}
                </div>
              </div>

              {/* section 3 */}
              <div>
                    <p>Frequently Bought Together</p>
              </div>

          </div>

          <Footer/>
          

    </div>
  )
}

export default Catalog