const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseName: String,
  courseDescription: String,
  courseDuration: Number,
 
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model (teacher)
  },

  
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the user model
    }
  ],

  

});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
