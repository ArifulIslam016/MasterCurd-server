const router = require("express").Router();
const express = require("express");
const { ObjectId } = require("mongodb");

router.patch("/:id", async (req, res) => {
  const studentId = req.params.id;
  const {
    department,
    studentName,
    course,
    isRegular,
    studentAge,
    skills,
    address,
    deptCode,
    courseName,
    courseFee,
    studentImage,
    departmentInfo,
  } = req.body;
  const DB = req.dbclient;
  const studentsCollection = DB.collection("students");
  const DepartmentCollection = DB.collection("Department");
  const coursesCollection = DB.collection("courses");
  const studentResult = await studentsCollection.findOne({
    _id: new ObjectId(studentId),
  });
  if (!studentResult) {
  return  res.send({ message: "Student not available" });
  }
  const courseId = studentResult.courseId;
  const deptId = studentResult.deptId;
  const depRes = await DepartmentCollection.updateOne(
    { _id: new ObjectId(deptId) },
   {$set: { department, deptCode, updatedAt: new Date() }},
  );
  const courseRes = await coursesCollection.updateOne(
    { _id: new ObjectId(courseId) },
    {$set:{ courseName, courseFee, updatedAt: new Date() }},
  );
  const StudentRes = await studentsCollection.updateOne(
    { _id: new ObjectId(studentId) },
   { $set:{
      studentName,
      courseId,
      isRegular,
      studentAge,
      skills,
      address,
      deptId,
      studentImage,
      updatedAt: new Date(),
    },}
  );
  res.send({depRes, courseRes, StudentRes});
});
module.exports = router;
