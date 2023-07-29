import React from 'react';
import Footer from "../components/common/footer"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';


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
              <p>{`Home / Catalog`} <span className='text-white'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
              <p>{catalogPageData?.data?.selectedCategory?.name}</p>
              <p>{catalogPageData?.data?.selectedCategory?.description}</p>
          </div>


          <div>

              {/* section 1 */}
              <div>
                    <div>Courses to get you Started</div>
                    <div className='flex gap-x-3'>
                          <p>Most Popular</p>
                          <p>New</p>
                    </div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
              </div>

              {/* section 2 */}
              <div>
                <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                <div>
                  <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
              </div>

              {/* section 3 */}
              <div>
                    <div>Frequently Bought </div>
                    <div className='py-8'>

                          <div className='grid grid-cols-1 lg:grid-cols-2'>

                            {
                              catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                              ))
                            }

                          </div>

                    </div>
              </div>

          </div>

          <Footer/>
          

    </div>
  )
}

export default Catalog