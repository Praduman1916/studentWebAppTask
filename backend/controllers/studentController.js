const Student = require("../model/student.model");
const addStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(error.status || 500).json({ error: error.message || "Unable to add student" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedStudentData = req.body;
        console.log("Test",studentId,updatedStudentData)
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            updatedStudentData,
            { new: true }
        );
        if (!updatedStudent) {
            res.status(404);
            throw new Error("Student not found");
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error editing student:', error);
        res.status(error.status || 500).json({ error: error.message || "Unable to edit student" });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndRemove(studentId);
        if (!deletedStudent) {
            res.status(404);
            throw new Error("Student not found");
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(error.status || 500).json({ error: error.message || "Unable to delete student" });
    }
};
const searchStudentByName = async (req, res) => {
    try {
        const params = req.body;
        console.log("Test body",params)
        const students = await Student.find({
            'firstName': { $regex: params.firstName, $options: 'i' }
        });
        console.log("Test studemtyfff",students)
        if (!students || students.length === 0) {
            res.status(404).json({ message: "No students found" });
            return;
        }
        res.status(200).json(students);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Unable to search students" });
    }
};

const getAllStudent = async (req, res) => {
    try {
        const students = await Student.find().sort({ _id: -1 });
        if (!students || students.length === 0) {
            res.status(404).json({ message: "No students found" });
            return;
        }
        res.status(200).json(students);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Unable to get all students" });
    }
};

module.exports = {
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudent,
    searchStudentByName
};
