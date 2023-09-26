//import mongoose module
const mongoose=require("mongoose");


//create match schema
const noteSchema=mongoose.Schema({
    note:Number,
    evaluation:String,


    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 
        required: true,
      },

   
    course: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course' // Reference to the Course model
        }
      ,
  

     
    

     
     
  
});


const note= mongoose.model("Note",noteSchema);
//export
module.exports=note;