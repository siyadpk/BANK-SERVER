//import express
const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt= require("jsonwebtoken")

const dataservices=require('./data-services/data.service')

//import cors
const cors= require('cors')





//create obj
const app=express()

//use cors
app.use(cors({
    origin:'http://localhost:4200'
}))

//set port number
app.listen(3000,()=>{
    console.log('server started');
})

//get request
app.get('/',(req,res)=>{
    res.send('GET REQUEST')
})


//post request
app.post('/',(req,res)=>{
    res.send('POST REQUEST')
})


//put request
app.put('/',(req,res)=>{
    res.send('PUT REQUEST')
})


//patch request
app.patch('/',(req,res)=>{
    res.send('PATCH REQUEST')
})


//delete request
app.delete('/',(req,res)=>{
    res.send('DELETE REQUEST')
})

//convert json to normal
app.use(express.json())

//middleware-routerbase
const RouterMiddleware=(req,res,next)=>{
    try {const token=req.headers["x-access-token"]
    const data=jwt.verify(token,"siyad123")
    req.currentacno=data.currentaccno
    next()}

    catch{
        res.status(401).json({
            status:false,
            message:"invalid token!!please login.."
        })
    }
}

//bank-server Register
app.post('/register',(req,res)=>{

    dataservices.Register(req.body.acc,req.body.uname,req.body.pwd)
   .then(result=>{
    res.status(result.statuscode).json(result)

   })
   
       
  
    

})


//bank-server login
  
app.post('/login',(req,res)=>{

     dataservices.login(req.body.acc,req.body.pwd)
     .then(result=>{
        res.status(result.statuscode).json(result) 
     })
     
 
 })

 //bank-server deposit
 app.post('/deposit',RouterMiddleware,(req,res)=>{

    dataservices.deposit(req,req.body.acc,req.body.pwd,req.body.amt)
    .then(result=>{
        res.status(result.statuscode).json(result) 
     })
 
 })

  
//bank-server withdraw
app.post('/withdraw',RouterMiddleware,(req,res)=>{

     dataservices.withdraw(req,req.body.acc,req.body.pwd,req.body.amt)
     .then(result=>{
        res.status(result.statuscode).json(result) 
     })
 
 })
   
//bank-server transaction
app.post('/transaction',RouterMiddleware,(req,res)=>{

     dataservices.Transaction(req,req.body.acc)
     .then(result=>{
        res.status(result.statuscode).json(result) 
     })
 
 
 })

 app.delete('/delete/:acc',(req,res)=>{
     
     dataservices.DeleteAcc(req.params.acc)
     .then(result=>{
        res.status(result.statuscode).json(result) 
     })
 })

 //middlewear
 //application specific middlewear
//  const appmiddleware=(req,res,next)=>{
//      console.log('application specific middlewear');
//   }
//  app.use(appmiddleware)// 
      
   
