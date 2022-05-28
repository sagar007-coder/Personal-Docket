const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const Todo = require('./model/todo');
const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.urlencoded());
app.use(express.static('assests'));




app.get('/' , function(req,res){
     Todo.find({}, function(err, todo){
    if(err){
        console.log('Error in fetching contact from db');
        return;
    }
    return res.render('home',{
       title: "Todo List",
       todo_list: todo
    });
});
});

app.post('/add-todo' , function(req , res){
  // contactList.push(req.body);
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    },function(err, newTodo){
if(err){console.log('error in creating a Todo!!' );
return};
   console.log('*******' , newTodo);
   return res.redirect('/');
    });
});

app.get('/delete-task' , function(req, res){
    //get the id from query in the url
   
  let id = req.query.id;

  // find the contact in the data basae using id and delete

  Todo.findByIdAndDelete(id, function(err){
   if(err)
   {
       console.log('error in deleting');
   
    return;  
  }
  return res.redirect('/');
});
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
