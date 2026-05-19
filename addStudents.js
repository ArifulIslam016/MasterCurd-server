const router=require('express').Router()
const express=require('express')

router.post('/',async(req,res)=>{
    const DB=req.dbclient
    const {department,studentName,course,isRegular,studentAge,skills,address,deptCode, 
      courseName, 
      courseFee,studentImage}=req.body;
      const studentsCollection=DB.collection('students')
      const DepartmentCollection=DB.collection('Department')
      const coursesCollection=DB.collection('courses')  
      const couresResult=await coursesCollection.insertOne({courseName,courseFee})
      const courseId=couresResult.insertedId
        const deptResult=await DepartmentCollection.insertOne({department,deptCode,courseId})
    const deptId=deptResult.insertedId
    const result=await studentsCollection.insertOne({studentName,courseId,isRegular,studentAge,skills,address,deptId,studentImage,CreadedAt:new Date()})
    res.send(result)
})


module.exports=router