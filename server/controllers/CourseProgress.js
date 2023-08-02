const SubSection = require("../models/subSection")

exports.updateCourseProgress = async(req,res)=>{
    const {courseId , subSectionId} =req.body;
    const userId = req.user.id;

    try{

        //check if subsection valid
        const subsection = await SubSection .findById(subSectionId)

        if(!subsection){
            return res.status(404).json({error:"INvalid subsection id"})
        }

        

    }
    catch(err){
        
    }
}