const router = require("express").Router();
const express = require("express");
const { ObjectId } = require("mongodb");

router.delete("/:id", async (req, res) => {
  const studentId = req.params.id;
// console.log(studentId)
  const DB = req.dbclient;

  const studentsCollection = DB.collection("students");
  const DepartmentCollection = DB.collection("Department");
  const coursesCollection = DB.collection("courses");
  const studentResult =await studentsCollection.findOne({_id:new ObjectId(studentId)})
  if(!studentResult){
    res.send({message:"student Not available"})
  }
  const courseId=studentResult.courseId;
  const deptId=studentResult.deptId
const depRes=await DepartmentCollection.deleteOne({_id:new ObjectId(deptId)})
const courseRes=await coursesCollection.deleteOne({_id:new ObjectId(courseId)})
const StudentRes=await studentsCollection.deleteOne({_id:new ObjectId(studentId)})
res.send(depRes,courseRes,StudentRes)
});


module.exports = router;
