//import mongoose module
const mongoose=require("mongoose");
//import mongoose unique validator module
const uniqueValidator=require("mongoose-unique-validator");

//create match schema
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{type:String, unique:true},
    pwd:String,
    status: String,
    adress:String,
    tel: String,
    role:String,
    speciality:String,
    pdf:String,
    avatar:String,
    childNumber:String,


    //for teacher courses
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course' // Reference to the Course model
        }
      ],
  

      //contient les cours du student
      enrolledCourses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course', // Reference to the Course model
        },
      ],

      notes: [
        {
          type: mongoose.Schema.Types.ObjectId,  //contain the notes of a student
          ref: 'Note', // Reference to the Course model
        },
      ],

     
     
  
});
userSchema.plugin(uniqueValidator);

//affect model name to schema

const user= mongoose.model("User",userSchema);
//export match
module.exports=user;