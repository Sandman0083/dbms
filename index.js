const express = require("express");
const app = express();
const mySql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors())
app.use(express.json())


const db = mySql.createConnection({
    database:"education",
    host:"localhost",
    user:"root",
    password:""
})



app.post('/login', (req, res)=>{
    dept= req.body.dept,
   userId= req.body.userId,
   password= req.body.password
   db.query("SELECT * FROM admin WHERE userid=? AND password=? AND department=?",[userId, password, dept], (err, result)=>{
   
   if(result.length>0){
       const token = jwt.sign(
           {
               user: result.userId,
               dept: result.dept
           }, 'secret123'
       )
       return res.json({status:'ok', user:token})
   }
   else{
    res.send({message : "Wrong Username or Password", user:false})
   }

})
})



app.post('/add',(req,res)=>{
    course_id	= req.body.subCode,
    link = req.body.link,
    sem_id = req.body.sem
 db.query("INSERT INTO course (course_id, link, sem_id) VALUES(?,?,?)",[course_id, link, sem_id], (err, result)=>{
     if (err) {
         console.log(err);
     } else{
         console.log("success");
     }
 })
  
})


app.get('/getdata', (req,res)=>{
    db.query("SELECT * FROM course", (err,result)=>{
        if(err){
            console.log(err);
        }else{
           res.send(result)
        }
    })
})


app.listen(3001, ()=>{
    console.log("serever is running");
})