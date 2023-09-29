import React, { useEffect, useState } from 'react';
import './StudentAddEditModal.css';
import { Box, Button, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
const StudentAddEditModal = (props) => {
    let student = props.student
    let id = props.student && props.student._id
    const [formData, setFormData] = useState({
        rollNo: '',
        firstName: '',
        lastName: '',
        address: '',
        subjects: [''],
        gender: 'Male',
        photoPath: '',
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubjectChange = (index, value) => {
        const updatedSubjects = [...formData.subjects];
        updatedSubjects[index] = value;
        setFormData({ ...formData, subjects: updatedSubjects });
    };

    const handleAddSubject = () => {
        if (formData.subjects.length < 7) {
            setFormData({ ...formData, subjects: [...formData.subjects, ''] });
        }
    };
    const handleRemoveSubject = (index) => {
        const updatedSubjects = [...formData.subjects];
        updatedSubjects.splice(index, 1);
        setFormData({ ...formData, subjects: updatedSubjects });
    };
    useEffect(() => {
        if (student) {
            setFormData({
                rollNo: student.rollNo,
                firstName: student.firstName,
                lastName: student.lastName,
                address: student.address,
                subjects: student.subjects,
                gender: student.gender,
                photoPath: student.photoPath,
            });
        }
    }, [student]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await axios.put(`http://localhost:5000/api/updatestudent/${id}`, formData);
            } else {
                response = await axios.post('http://localhost:5000/api/addstudent', formData);
            }
            if (response.status === 201 || response.status === 200) {
                alert('Student data saved successfully.');
                window.location.reload()
            } else {
                console.error('Failed to save student data. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error saving student data:', error);
        }
    };

    return (
        <div className="student-form">
            <div className="add-button-container">
                <button className="add-button" onClick={handleOpen}>
                    {student ? <EditIcon /> : <AddIcon />}{!student && 'Add Student'}
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box>
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
                            <form onSubmit={handleSubmit} className="form">
                                <div className="grid-container">
                                    <div className="grid-item">
                                        <label className="input-label">
                                            First Name:
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="grid-item">
                                        <label className="input-label">
                                            Last Name:
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="grid-item">
                                        <label className="input-label">
                                            Roll No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                            <input
                                                type="text"
                                                name="rollNo"
                                                value={formData.rollNo}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div className="grid-item">
                                        <label className="input-label">
                                            Gender: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Undisclosed">Undisclosed</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="grid-item">
                                        <label className="input-label">
                                            Subjects:
                                            {formData.subjects.map((subject, index) => (
                                                <div key={index} className="subject-item">
                                                    <input
                                                        type="text"
                                                        value={subject}
                                                        required
                                                        onChange={(e) =>
                                                            handleSubjectChange(index, e.target.value)
                                                        }
                                                        placeholder={`Subject ${index + 1}`}
                                                    />
                                                    {formData.subjects.length > 1 && <button
                                                        type="button"
                                                        onClick={() => handleRemoveSubject(index)}
                                                        className="delete-button"
                                                    >
                                                        Delete
                                                    </button>}
                                                </div>
                                            ))}
                                            {formData.subjects.length < 7 && (
                                                <button
                                                    type="button"
                                                    onClick={handleAddSubject}
                                                    className="add-subject-button"
                                                >
                                                    Add Subject
                                                </button>
                                            )}
                                        </label>
                                    </div>

                                    <div className="grid-item">
                                        <label className="input-label">
                                            Address:&nbsp;&nbsp;&nbsp; &nbsp;
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </label>
                                    </div>

                                    <div className="grid-item">
                                        <label className="input-label">
                                            Upload Photo:
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="photoPath"
                                                onChange={(e) =>
                                                    setFormData({ ...formData, photoPath: e.target.value })
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="button-container">
                                    <button type="submit" className="submit-button">
                                        {student ? "Update" : "Submit"}
                                    </button>
                                    <Button className="close-button" onClick={handleClose}>
                                        Close
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default StudentAddEditModal;
