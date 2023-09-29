import React, { useEffect, useState } from 'react'
import StudentAddEditModal from './StudentAddEditModal'
import DeleteIcon from '@mui/icons-material/Delete';
import "./StudentList.css"
import { Button } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
const StudentList = () => {
  const [student, setStudent] = useState([])
  const getAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallstudent');
      console.log("Test respiosne ayb", response)
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  useEffect(() => {
    getAllStudents();
  }, [])
  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deletestudent/${id}`);
      console.log("Test response ", response)
      if (response.status === 200) {
        alert("Student deleted successfully");
        window.location.reload()
      } else {
        console.error(`Failed to delete student`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting student with ID ${id}: ${error.message}`);
    }
  }
  const handleChange = (event) => {
    setValue(event.target.value.trim());
  };
  const [value, setValue] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/searchbyfirstname', {
        firstName: value,
      });
      setStudent(response.data);
    } catch (error) {
      console.error('Error searching for students:', error);
    }
  };
  return (
    <div>
      <StudentAddEditModal />
      <br />
      <form onSubmit={handleSubmit}>
        <div style={{ fontSize: '17px', display: 'flex' }}>
          <label style={{ marginRight: '10px', marginLeft: '40px' }}>
            <b>Enter student Name:</b>
          </label>
          <input
            type="text"
            name="firstName"
            value={value}
            onChange={handleChange}
            required
            style={{ marginRight: '10px', width: '200px', }}
          />
          <Button
            type="submit"
            // onClick={handleSearch}
            style={{
              background: '#3760F1',
              color: 'white',
              height: '30px',
              border: 'none',
              cursor: 'pointer',
            }}>
            <SearchIcon />
          </Button>
        </div>
      </form>
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              {/* <th>Subject</th> */}
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.length > 0 ?
              student.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollNo}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.address}</td>
                  {/* <td>{student.subject}</td> */}
                  <td>{student.gender}</td>
                  <td>

                    <button className="delete-button"
                      onClick={() => deleteStudent(student._id)}><DeleteIcon /></button>
                    <StudentAddEditModal student={student} />
                  </td>
                </tr>
              )) : <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Data Not found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList
