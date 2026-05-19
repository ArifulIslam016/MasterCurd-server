const router=require('express').Router()
const express=require('express')

router.get('/',async(req,res)=>{
const DB=req.dbclient;
const studentsCollection=DB.collection('students')
const depertmentCollection=DB.collection('Department')
const coursesCollection=DB.collection('courses')

const result=await studentsCollection.aggregate([
  {
    $lookup:{   
        from:'Department',
        localField:'deptId',
        foreignField:'_id',
        as:'Department'
    }
  },
  {$lookup:{
    from:'courses',
    localField:'courseId',  
    foreignField:'_id',
    as:'course'
  }}
]).toArray()
res.send(result)


})
module.exports=router