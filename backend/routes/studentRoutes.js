const express = require("express");
const {
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudentByName,
    getAllStudent
} = require("../controllers/studentController")
const router = express.Router();
router.route("/addstudent").post(addStudent);
router.route("/updatestudent/:id").put(updateStudent);
router.route("/deletestudent/:id").delete(deleteStudent);
router.route("/getallstudent").get(getAllStudent)
router.route("/searchbyfirstname").post(searchStudentByName)
module.exports = router;