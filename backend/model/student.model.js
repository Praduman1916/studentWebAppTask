const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: String,
    },
  ],
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Undisclosed'],
    required: true,
  },
  photoPath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
