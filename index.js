//import express
const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const dataservices=require('./data-services/data.service')



//create obj
const app=express()

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

//bank-server Register
app.post('/register',(req,res)=>{

   const result= dataservices.Register(req.body.acc,req.body.usname,req.body.passwd)

   if(result){
       res.send('successfully registered..')
   }
   else{
       res.send('Existing user...')
   }

    

})