const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   description:{
       type: String,
       required: true
   } ,
   category:{
       type : String,
       required : true
   },
   duedate:{
  type : String,
  required : true
   }
});

const todo = mongoose.model('Todo' , todoSchema);

module.exports = todo;